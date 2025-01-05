<template>
    <div class="row">
        <div class="col-12">
            <div class="card m-2">
                <div class="card-body">
                    <div class="product-list-wrapper d-flex justify-content-between align-items-center">
                        <div class="product-list-title">
                            Products
                        </div>
                        <div class="product-create-button-sec">
                            <router-link :to="{name:'product-test'}" class="btn btn-primary">Create</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>