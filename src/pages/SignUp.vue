<template>
    <div class="container-fluid ps-md-0">
        <div class="row g-0">


            <div class="col-md-8 col-lg-6">
                <div class="signup d-flex align-items-center py-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-9 col-lg-8 mx-auto">
                                <h3 class="signup-heading text-center mb-4">Sign up!</h3>

                                <form @submit.prevent="submitData">
                                    <div class="form-floating mb-3">
                                        <input type="email" v-model="enteredEmail" class="form-control"
                                            id="floatingInput" placeholder="name@example.com">
                                        <label for="floatingInput">Email address</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="password" v-model="enteredPassword" class="form-control"
                                            id="floatingPassword" placeholder="Password">
                                        <label for="floatingPassword">Password</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="text" v-model="enteredUsername" class="form-control"
                                            id="floatingInput" placeholder="username">
                                        <label for="floatingInput">Username</label>
                                    </div>
                                    <div class="d-grid">
                                        <button class="btn btn-lg btn-secondary btn-signup text-uppercase fw-bold mb-2"
                                            type="submit">Sign Up</button>
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
export default {
    emits: ['add-user'],
    data() {
        return {
            enteredEmail: '',
            enteredPassword: '',
            enteredUsername: ''
        };
    },

    methods: {
        submitData() {
            this.$emit('add-user', this.enteredEmail, this.enteredPassword, this.enteredUsername);
        }
    },
};
</script>

<style>
.signup {
    min-height: 100vh;
}

/*.bg-image {
    background-color: #C5ECE0;
    background-size: cover;
    background-position: center;
}*/

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
</style>