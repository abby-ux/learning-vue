<template>
    <!-- <NavBar :pages="pages" 
            :active-page="activePage"
            :nav-link-click="(index) => activePage = index">
    </NavBar> -->
    <NavBar 
        :key="pages.length" 
        :pages="pages" 
        :active-page="activePage" >
    </NavBar>

    <router-view></router-view>
    
    <!-- <PageViewer v-if="pages.length > 0" 
                :page="pages[activePage]"></PageViewer>

    <CreatePage @page-created="pageCreated"></CreatePage> -->
</template>

<script>
import PageViewer from './components/PageViewer.vue';
import NavBar from './components/NavBar.vue';
import CreatePage from './components/CreatePage.vue';

export default {
    components: {
        PageViewer,
        NavBar,
        CreatePage
    },
    created() {
        this.getPages();
        this.$bus.$on('navBarLinkActivated', (index) => {
            this.activePage = index;
        })
    },
    data() {    
        return {
            activePage: 0,
            pages: []
        };
    },
    methods: {
        async getPages() {
            let res = await fetch('pages.json');
            let data = await res.json();
            this.pages = data;
        },
        pageCreated(pageObj) {
            console.log('Received page-created event with:', pageObj);
            this.pages.push(pageObj);
            console.log('Updated pages array:', this.pages);
        }
    }
}
</script>
