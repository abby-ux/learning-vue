<template>
    <li>
        <router-link 

        :to="`/${index}`"
        class="nav-link"
        :class="activeClasses"
        aria-current="page"
        :title="`This is the {page.link.title} page`"
        @click.prevent="$bus.$emit('navBarLinkActivated', index)">
        {{ page.link.title }}
        </router-link>
    </li>

</template>

<script>
export default {
    props: ['page', 'index', 'isActive'],
    computed: {
        activeClasses() { // to bind CSS classes
            return {
                active: this.isActive,
                emphasize: this.isActive
            }
        }
    }
}
</script>

<!-- By defualt, style is global, but we can make it scoped -->
<style scoped> 
.emphasize {
    text-decoration: underline !important;
}
</style>