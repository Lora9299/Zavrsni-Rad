<template>
    <div class="account-container">
        <div class="user-info-container">
            <div class="profile-container">
                <div class="profile-picture-container">
                    <div class="profile-picture" @click="triggerFileUpload">
                        <template v-if="isUploading">
                            <base-spinner></base-spinner>
                        </template>
                        <template v-else>
                            <img v-if="profilePicture" :src="profilePicture" alt="Profile Picture" />
                            <button v-else class="upload-button">SET IMAGE</button>
                        </template>
                        <input type="file" ref="fileInput" @change="onFileChange" class="file-input" />
                    </div>
                </div>

                <div class="user-info">
                    <div class="info">
                        USERNAME: <span class="data">{{ username }}</span>
                        <button class="edit" @click="editField('username')"><font-awesome-icon
                                :icon="['fas', 'edit']" /></button>
                    </div>
                    <span class="horizontal-line"></span>
                    <div class="info">E-MAIL: <span class="data">{{ email }}</span>
                        <button class="edit" @click="editField('email')"><font-awesome-icon
                                :icon="['fas', 'edit']" /></button>
                    </div>
                    <span class="horizontal-line"></span>
                    <div class="info">CONTACT: <span class="data">{{ contact }}</span> <button class="edit"
                            @click="editField('contact')"><font-awesome-icon :icon="['fas', 'edit']" /></button>
                    </div>
                    <span class="horizontal-line"></span>
                    <div class="info">CITY:<span class="data">{{ location }}</span><button class="edit"
                            @click="editField('location')"><font-awesome-icon :icon="['fas', 'edit']" /></button></div>
                    <span class="horizontal-line"></span>
                </div>

                <div class="account-delete">
                    <button class="delete-button" @click="showDeleteDialog = true">
                        <font-awesome-icon class="x-icon" :icon="['fas', 'x']" />
                        Delete account
                    </button>

                </div>
            </div>
        </div>

        <div class="vertical-line"></div>

        <div class="user-ads-container">
            <h2>Your Animals</h2>
            <div v-if="isLoading" class="spinner-container">
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="animals.length > 0">
                <animal-ad v-for="animal in animals" :key="animal.id" :id="animal.id" :title="animal.title"
                    :type="animal.type" :gender="animal.gender" :breed="animal.breed" :age="animal.age"
                    :price="animal.price" :description="animal.description" :location="animal.location"
                    :contact="animal.contact" :images="animal.images" @adDeleted="removeAdFromList"></animal-ad>
            </ul>
            <p v-else>You have no ads</p>
        </div>

        <base-dialog :show="showDeleteDialog" title="Confirm Delete Account" @close="showDeleteDialog = false">
            <template #default>
                <p>Are you sure you want to delete your account? This action cannot be undone and will delete all your
                    ads.</p>
            </template>
            <template #actions>
                <base-button @click="confirmDeleteAccount">Yes</base-button>
                <base-button @click="showDeleteDialog = false">No</base-button>
            </template>
        </base-dialog>

        <base-dialog :show="isDeleting" title="Deleting Account">
            <template #default>
                <p>Please wait while we delete your account...</p>
                <base-spinner></base-spinner>
            </template>
        </base-dialog>

        <base-card :show="showEditCard" :title="editCardTitle" @close="showEditCard = false" @save="saveEdit">
            <div v-if="isSaving">
                <base-spinner></base-spinner>
            </div>
            <div v-else>
                <div v-if="editFieldType === 'username'" class="form-control">
                    <label for="edit-username">Username</label>
                    <input type="text" id="edit-username" v-model="editUsername.val" @input="validateUsername" />
                    <p v-if="!editUsername.isValid" class="input-error">Username already exists.</p>
                </div>
                <div v-if="editFieldType === 'email'" class="form-control">
                    <label for="edit-email">Email</label>
                    <input type="text" id="edit-email" v-model="editEmail.val" />
                    <p v-if="!this.editEmail.isValid" class="input-error">E-mail must include an @.</p>
                </div>
                <div v-if="requiresPassword" class="form-control">
                    <label for="edit-password">Password</label>
                    <input type="password" @blur="clearValidity('password')" id="edit-password"
                        v-model="password.val" />
                    <p v-if="!this.password.isValid" class="input-error">Password must be correct.</p>
                    <p v-if="this.passwordIsEmpty" class="input-error">Password can't be empty.</p>
                </div>
                <div v-if="editFieldType === 'contact'" class="form-control">
                    <label for="edit-contact">Contact</label>
                    <input type="text" id="edit-contact" v-model="editContact" />
                </div>
                <div v-if="editFieldType === 'location'" class="form-control">
                    <label for="edit-location">Location</label>
                    <input type="text" id="edit-location" v-model="editLocation" />
                </div>
            </div>
        </base-card>
    </div>
</template>

<script>
import AnimalAd from '../components/animals/AnimalAd.vue';
import BaseSpinner from '../components/BaseSpinner.vue';
import BaseDialog from '../components/BaseDialog.vue';
import BaseButton from '../components/BaseButton.vue';
import BaseCard from '../components/BaseCard.vue';
import { mapGetters, mapActions } from "vuex";
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
    data() {
        return {
            isLoading: false,
            animals: [],
            showDeleteDialog: false,
            isDeleting: false,
            isUploading: false,
            showEditCard: false,
            isSaving: false,
            editFieldType: '',
            editUsername: { val: '', isValid: true },
            editEmail: { val: '', isValid: true },
            editContact: '',
            editLocation: '',
            password: { val: '', isValid: true },
            passwordIsEmpty: false,
            formIsValid: true,
        };
    },


    components: {
        AnimalAd,
        BaseSpinner,
        BaseDialog,
        BaseButton,
        BaseCard
    },


    computed: {
        ...mapGetters("users", ["user"]),
        username() {
            return this.user ? this.user.username : "";
        },
        email() {
            return this.user ? this.user.email : "";
        },
        profilePicture() {
            return this.user && this.user.profilePicture ? this.user.profilePicture : '';
        },
        contact() {
            return this.user && this.user.contact ? this.user.contact : "";
        },
        location() {
            return this.user && this.user.location ? this.user.location : "";
        },
        requiresPassword() {
            return this.editFieldType === 'username' || this.editFieldType === 'email';
        },

        editCardTitle() {
            switch (this.editFieldType) {
                case 'username':
                    return 'Change username';
                case 'email':
                    return 'Change e-mail';
                case 'contact':
                    return 'Edit Contact Information';
                case 'location':
                    return 'Edit Location Information';
                default:
                    return '';
            }
        }
    },


    methods: {
        async fetchAnimals(animalType) {
            const db = getFirestore();
            const animalsQuery = query(
                collection(db, "animals", "animalData", animalType),
                where("userId", "==", this.user.uid)
            );
            const animalsSnapshot = await getDocs(animalsQuery);
            return animalsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        },
        async confirmDeleteAccount() {
            this.isDeleting = true;
            try {
                await this.$store.dispatch('users/deleteAccount');
                this.$router.push({ path: '/home' });
            } catch (error) {
                console.error("Error deleting account:", error);
            } finally {
                this.isDeleting = false;
            }
        },

        ...mapActions('users', ['uploadProfilePicture', 'updateUserData']),
        triggerFileUpload() {
            this.$refs.fileInput.click();
        },

        async onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.isUploading = true;
                try {
                    await this.uploadProfilePicture(file);
                } catch (error) {
                    console.error("Error uploading profile picture:", error);
                } finally {
                    this.isUploading = false;
                }
            }
        },

        removeAdFromList(adId) {
            this.animals = this.animals.filter(animal => animal.id !== adId);
        },

        validateForm() {

            this.formIsValid = true;

            if (this.requiresPassword) {
                if (this.password.val === '') {
                    this.passwordIsEmpty = true;
                    this.password.isValid = false;
                    console.log('Password is empty');
                    this.formIsValid = false;
                } else if (!this.checkPassword()) {
                    this.password.isValid = false;
                    console.log('Password is invalid');
                    this.formIsValid = false;
                } else {
                    this.password.isValid = true;
                    this.passwordIsEmpty = false;
                }
            }

            if (this.editFieldType === 'email') {
                if (this.editEmail.val === '' || !this.editEmail.val.includes('@')) {
                    this.editEmail.isValid = false;
                    console.log('Email is invalid');
                    this.formIsValid = false;
                } else {
                    this.editEmail.isValid = true;
                }
            }

            if (this.editFieldType === 'username') {
                if (!this.editUsername.isValid) {
                    console.log('Username is invalid or already taken');
                    this.formIsValid = false;
                }
            }


        },

        clearValidity(input) {
            this[input].isValid = true;
        },

        editField(fieldType) {
            this.editFieldType = fieldType;
            if (fieldType === 'username') {
                this.editUsername.val = this.username;
            } else if (fieldType === 'email') {
                this.editEmail.val = this.email;
            } else if (fieldType === 'contact') {
                this.editContact = this.contact;
            } else if (fieldType === 'location') {
                this.editLocation = this.location;
            }
            this.showEditCard = true;
        },

        async saveEdit() {
            console.log('saveEdit called');
            this.isSaving = true;
            this.passwordIsEmpty = false;
            this.validateForm();

            if (!this.formIsValid) {
                console.log('Form is invalid');
                this.isSaving = false;
                return;
            }

            try {
                if (this.requiresPassword && !await this.checkPassword()) {
                    this.password.isValid = false;
                    console.error("Invalid password");
                    throw new Error("Invalid password");
                }

                if (this.editFieldType === 'username' && !await this.isUsernameUnique()) {
                    this.editUsername.isValid = false;
                    console.log('Username is not unique');
                    this.isSaving = false;
                    return;
                }

                const updateData = {};
                if (this.editFieldType === 'username') {
                    updateData.username = this.editUsername.val;
                } else if (this.editFieldType === 'email') {
                    updateData.email = this.editEmail.val;
                } else if (this.editFieldType === 'contact') {
                    updateData.contact = this.editContact;
                } else if (this.editFieldType === 'location') {
                    updateData.location = this.editLocation;
                }

                await this.updateUserData(updateData);

                const db = getFirestore();
                const userDoc = doc(db, 'users', this.user.uid);
                await updateDoc(userDoc, updateData);

            } catch (error) {
                console.error("Error updating user info:", error);
            } finally {
                this.isSaving = false;
                this.showEditCard = false;
                this.password.val = '';
            }
        },

        async checkPassword() {
            const auth = getAuth();
            const user = auth.currentUser;
            const email = user.email;

            try {
                await signInWithEmailAndPassword(auth, email, this.password.val);
                return true;
            } catch (error) {
                console.error("Error verifying password:", error);
                return false;
            }
        },

        async isUsernameUnique() {
            const db = getFirestore();
            const usersQuery = query(collection(db, "users"), where("username", "==", this.editUsername.val));
            const usersSnapshot = await getDocs(usersQuery);
            return usersSnapshot.empty;
        },

        async validateUsername() {
            if (this.editUsername.val !== this.username) {
                this.editUsername.isValid = await this.isUsernameUnique();
                if (!this.editUsername.isValid) {
                    console.log('Username is already taken');
                }
            } else {
                this.editUsername.isValid = true;
            }
        }
    },

    async checkPassword() {
        const auth = getAuth();
        const user = auth.currentUser;
        const email = user.email;

        try {
            await signInWithEmailAndPassword(auth, email, this.password.val);
            return true;
        } catch (error) {
            console.error("Error verifying password:", error);
            return false;
        }
    },

    async isUsernameUnique() {
        const db = getFirestore();
        const usersQuery = query(collection(db, "users"), where("username", "==", this.editUsername.val));
        const usersSnapshot = await getDocs(usersQuery);
        return usersSnapshot.empty;
    },

    async validateUsername() {
        if (this.editUsername.val !== this.username) {
            this.editUsername.isValid = await this.isUsernameUnique();
        } else {
            this.editUsername.isValid = true;
        }
    },


    async created() {
        if (this.user) {
            this.isLoading = true;
            try {
                const cats = await this.fetchAnimals("cats");
                const dogs = await this.fetchAnimals("dogs");

                this.animals = [...cats, ...dogs];
            } catch (error) {
                console.error("Error fetching animals:", error);
            } finally {
                this.isLoading = false;
            }
        }
    }
};
</script>


<style scoped>
.account-container {
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    justify-content: center;
    align-items: stretch;
}

.user-info-container {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-sizing: border-box;
    position: relative;
}

.profile-container {
    box-sizing: border-box;
    position: sticky;
    z-index: 5;
    top: 0;
}

.profile-picture-container {
    display: flex;
    vertical-align: middle;
    justify-content: center;
    background-color: rgb(219, 244, 218);
    padding-top: 50px;
    padding-bottom: 50px;
    margin-bottom: 50px;
}

.profile-picture {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background-color: #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
}

.profile-picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.upload-button {
    border: none;
    background: none;
    color: #3e4043;
    cursor: pointer;
    font-size: 14px;
}

.upload-button:hover {
    color: #767676;
}

.file-input {
    display: none;
}

.info {
    padding: 15px;
    display: flex;
    font-weight: 600;
}

.data {
    padding-left: 10px;
    font-weight: 400;
}

.edit {
    background: none;
    border: none;
    margin-left: auto;
}

.user-info {
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 255, 255);
    padding: 20px;

}

.vertical-line {
    width: 1px;
    background-color: #ccccccba;
    height: auto;
    align-self: stretch;
    margin: 0 20px;
}

.horizontal-line {
    width: 100%;
    height: 1px;
    background-color: #ccccccba;
}

.user-ads-container {
    width: 75%;
    padding: 1.5rem;
    border-radius: 8px;
    text-align: center;
    box-sizing: border-box;
}

.user-ads-container ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.user-ads-container li {
    margin-bottom: 0.5rem;
}

.account-delete {
    color: rgb(191, 56, 56);
    margin-top: 1rem;
    padding-left: 30%;
    padding-top: 50px;
    margin-bottom: 5px;
}

.account-delete:hover {
    color: rgb(219, 82, 82);
}

.delete-button {
    display: flex;
    align-items: center;
    background: none;
    color: inherit;
    border: none;
    text-decoration: underline;
    font-size: 1rem;
    cursor: pointer;
}

.x-icon {
    color: rgb(191, 56, 56);
    margin-right: 0.5rem;
}

.form-control {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
}

label {
    font-family: 'Roboto Condensed';
    font-weight: bold;
    margin-left: 10px;
}

input {
    background-color: rgb(233, 232, 232);
    border: none;
    margin-left: 10px;
    border-radius: 5px;
    margin-right: 40px;
}

.input-error {
    margin-left: 10px;
    color: rgb(228, 40, 40);
}

.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>