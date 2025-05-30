<template>
    <div class="loaderDiv">
        <BSpinner variant="primary" label="Spinning" class="loader" />
    </div>
</template>

<script setup>
    import { BSpinner } from "bootstrap-vue-next";
</script>

<style scoped>
    .loaderDiv {
        position: fixed;
        background: rgba(255, 255, 255, 0.8);
        z-index: 9999;
        height: 100vh;
        width: 100%;
        top : 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>