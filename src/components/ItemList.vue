<template>

    <div class="container-fluid pt-2 pb-2">
        <div class="d-flex justify-content-center row">
            <div class="col-md-10">
                <div class="row p-2 bg-white border rounded">
                    <div class="col-md-3 mt-1">
                        <img class="img-fluid img-responsive rounded product-image" src="/paw.png">
                    </div>
                    <div class="col-md-6 mt-1">
                        <h5 class="ms-5"> Product Name</h5>
                    </div>
                    <div class="align-items-center align-content-center col-md-3 border-start mt-1">
                        <div class="d-flex flex-column mt-4">
                            <router-link to="/pet/:id" class="btn btn-secondary btn-sm">VIEW</router-link>
                            <button class="btn btn-outline-secondary btn-sm mt-2" type="button">Favorite</button>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    </div>

</template>

<script>
export default {

};
</script>