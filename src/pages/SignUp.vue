<template>
    <div class="container-fluid ps-md-0">
        <div class="row g-0">
            <base-dialog :show="!!error" title="An error occurred" @close="handleError">
                <p>{{ error }}</p>
            </base-dialog>
            <base-dialog :show="isLoading" title="Loading..." fixed>
                <base-spinner></base-spinner>
            </base-dialog>

            <div class="col-md-8 col-lg-6">
                <div class="signup d-flex align-items-center py-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-9 col-lg-8 mx-auto">
                                <h3 class="signup-heading text-center mb-4">Sign up!</h3>

                                <form @submit.prevent="submitData">
                                    <div class="form-floating mb-3" :class="{ invalid: !enteredEmail.isValid }">
                                        <input type="email" v-model.trim="enteredEmail.val"
                                            @blur="clearValidity('enteredEmail')" class="form-control"
                                            id="floatingEmailInput" placeholder="name@example.com">
                                        <p v-if="!enteredEmail.isValid">Email can't be empty.</p>
                                        <label for="floatingEmailInput">Email address</label>
                                    </div>
                                    <div class="form-floating mb-3" :class="{ invalid: !enteredPassword.isValid }">
                                        <input type="password" v-model.trim="enteredPassword.val"
                                            @blur="clearValidity('enteredPassword')" class="form-control"
                                            id="floatingPassword" placeholder="Password">
                                        <p v-if="!enteredPassword.isValid">Password can't be empty.</p>
                                        <label for="floatingPassword">Password</label>
                                    </div>
                                    <div class="form-floating mb-3" :class="{ invalid: !enteredUsername.isValid }">
                                        <input type="text" v-model.trim="enteredUsername.val"
                                            @blur="clearValidity('enteredUsername')" class="form-control"
                                            id="floatingUsernameInput" placeholder="username">
                                        <p v-if="!enteredUsername.isValid">Username can't be empty.</p>
                                        <label for="floatingUsernameInput">Username</label>
                                    </div>
                                    <div class="d-grid">
                                        <button class="btn btn-lg btn-secondary btn-signup text-uppercase fw-bold mb-2"
                                            type="submit">Sign Up
                                        </button>
                                    </div>

                                    <div class="d-flex justify-content-center align-items-center">
                                        <p style="height: 7vh;">
                                            If you have an account please <router-link to="/login"
                                                class="login-link">Login</router-link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-none d-md-flex col-md-4 col-lg-6 ">
                <img src="/logindog.jpg">
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            enteredEmail: {
                val: '',
                isValid: true,
            },
            enteredPassword: {
                val: '',
                isValid: true,
            },
            enteredUsername: {
                val: '',
                isValid: true,
            },
            formIsValid: true,
        };
    },
    computed: {
        ...mapGetters('users', ['error', 'isLoading']),
    },
    methods: {
        ...mapActions('users', ['signUp']),
        validateForm() {
            this.formIsValid = true;
            if (this.enteredEmail.val === '' || !this.enteredEmail.val.includes('@')) {
                this.enteredEmail.isValid = false;
                this.formIsValid = false;
            }
            if (this.enteredPassword.val === '') {
                this.enteredPassword.isValid = false;
                this.formIsValid = false;
            }
            if (this.enteredUsername.val === '') {
                this.enteredUsername.isValid = false;
                this.formIsValid = false;
            }
        },
        clearValidity(input) {
            this[input].isValid = true;
        },
        async submitData() {
            this.validateForm();

            if (!this.formIsValid) {
                return;
            }

            await this.signUp({
                email: this.enteredEmail.val,
                password: this.enteredPassword.val,
                username: this.enteredUsername.val,
            });

            if (!this.error) {
                this.$router.push('/home');  // Adjust the route as needed
            }
        },
        handleError() {
            this.$store.commit('users/setError', null);
        }
    },
};
</script>

<style>
.signup {
    min-height: 100vh;
}

.login-link {
    color: gray;
    margin-left: 5px;
    display: inline-block;
    width: 50px;
}

.login-link:hover {
    color: #555;
    font-weight: bold;
}

.signup-heading {
    font-weight: 300;
}

.btn-signup {
    font-size: 0.9rem;
    letter-spacing: 0.05rem;
    padding: 0.75rem 1rem;
}

.invalid label {
    color: red;
}

.invalid input {
    border: 1px solid red;
}
</style>