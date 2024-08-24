<template>
    <div class="container-fluid ps-md-0">
        <div class="row g-0">
            <base-dialog :show="!!error" title="An error occurred" @close="handleError">
                <p>{{ error }}</p>
            </base-dialog>
            <base-dialog :show="isLoading" title="Loading..." fixed>
                <base-spinner></base-spinner>
            </base-dialog>

            <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image">
                <img src="/logincat.jpg" class="cat-image">
            </div>

            <div class="col-md-8 col-lg-6">
                <div class="login d-flex align-items-center py-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-9 col-lg-8 mx-auto">
                                <h3 class="login-heading text-center mb-4">Welcome back!</h3>

                                <form @submit.prevent="loginUser">
                                    <div class="form-floating mb-3">
                                        <input type="email" class="form-control" id="floatingInput"
                                            placeholder="name@example.com" v-model="email" required>
                                        <label for="floatingInput">Email address</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="password" class="form-control" id="floatingPassword"
                                            placeholder="Password" v-model="password" required>
                                        <label for="floatingPassword">Password</label>
                                    </div>
                                    <div class="d-grid">
                                        <button class="btn btn-lg btn-secondary btn-login text-uppercase fw-bold mb-2"
                                            type="submit">Login</button>
                                    </div>
                                    <div class="d-flex justify-content-center align-items-center">
                                        <p>If you don't have an account please <router-link to="/sign-up"
                                                class="sign-up">Sign Up</router-link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    computed: {
        ...mapGetters('users', ['error', 'isLoading']),
    },
    methods: {
        ...mapActions('users', ['login']),

        async loginUser() {
            const auth = getAuth();
            try {
                const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
                userCredential.user;
                await this.login({ email: this.email, password: this.password });
                this.$router.push('/home');
            } catch (error) {
                console.error('Error logging in:', error);
                this.handleError(error.message);
            }
        },

        handleError(message) {
            this.$store.commit('users/setError', message);
        }
    },
};
</script>

<style>
.form-floating input:focus {
    border-color: rgb(51, 51, 51);
    box-shadow: 0 0 0 0.25rem rgba(248, 252, 255, 0.25) !important;
}

.login {
    min-height: 100vh;
    position: relative;
}

.sign-up {
    color: gray;
    margin-left: 5px;
    display: inline-block;
    width: 60px;
}

.sign-up:hover {
    color: #555;
    font-weight: bold;
}

.bg-image {

    background-size: cover;
    background-position: center;

}

.cat-image {
    margin-left: auto;
}

.login-heading {
    font-weight: 300;
    color: black;
}

.btn-login {
    font-size: 0.9rem;
    letter-spacing: 0.05rem;
    padding: 0.75rem 1rem;
}
</style>