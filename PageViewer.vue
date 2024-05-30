<template>
        <div v-if="page" class="container">
            <h1>{{ page.pageTitle }}</h1>
            <p>{{ page.content }}</p>
        </div>
</template>

<script>
export default {
    // props: ['page'],
    //         template: `
                
    //         `
    created() {
        // console.log(this.$route.params);
        this.page = this.$pages.getSinglePage(this.$forceUpdate.params.index);
    },
    data() {
        return {
            page: null
        };
    }
}
</script>