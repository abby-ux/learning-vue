<template>
<nav id="nav" 
    :class="['navbar', 'navbar-expand-lg', `navbar-${theme}`, `bg-${theme}`]">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <NavBarLink
                        v-for="(page, index) in publishedPages" class="nav-item" :key="index"
                        :page="page"
                        :index="index"
                        :isActive="activePage == index"
                        @activated="$emit('activated')"
                    >
                    </NavBarLink>

                    <li>
                        <router-link
                        to="`/create"
                        class="nav-link"
                        aria-current="page">
                        {{ page.link.title }}
                        </router-link>
                    </li>
            </ul>
            <form class="d-flex">
                <button class="btn btn-primary" @click.prevent="changeTheme">
                    <span v-if="theme === 'light'">Dark Mode</span>
                    <span v-else>Light Mode</span>
                </button>
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    </div>
</nav>
</template>

<script>
import NavBarLink from './NavBarLink.vue';
export default {
    components: {
        NavBarLink
    },
    props: ['pages', 'activePage'],
    created() {
        this.getThemeSetting();
    },
    computed: {
        publishedPages() {
            return this.pages.filter(p => p.published);
        }
    },
    data() {
        return {
            theme: 'light'
        };
    },
    methods: {
        changeTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            this.storeThemeSetting();
        },
        storeThemeSetting() {
            localStorage.setItem('theme', this.theme);
        },
        getThemeSetting() {
            let theme = localStorage.getItem('theme');
            if (theme) {
                this.theme = theme;
            }
        }
    }
}
</script>
