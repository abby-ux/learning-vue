<template>
    <div class="container mb-3">
        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label for="pageTitle" class="form-label">Page Title</label>
                <input 
                    type="text"
                    class="form-control"
                    v-model="pageTitle"
                />
            </div>
            <div class="mb-3">
                <label for="content" class="form-label">Content</label>
                <textarea
                    id="content"
                    class="form-control"
                    rows="5"
                    v-model="content"
                ></textarea>
            </div>
            <div class="mb-3">
                <label for="" class="form-label">
                    Link Text
                </label>
                <input type="text"
                v-model="linkText">
            </div>
            <div class="mb-3">
                <label for="" class="form-label">
                    Link URL
                </label>
                <input type="text"
                v-model="linkUrl">
            </div>
            <div class="row mb-3">
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" v-model="published">
                    <label class="form-check-label" for="gridCheck1">
                        Published
                    </label>
                </div>
            </div>
            <div class="mb-3">
                <button class="btn btn-primary"
                @click.prevent="submitForm"
                :disabled="isFormInvalid"
                >Create Page</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    emits: {
        pageCreated({pageTitle, content, link}){
            if (!pageTitle){
                return false;
            }
            if (!content){
                return false;
            }
            if (!link || !link.url || !link.text){
                return false;
            }
            return true;
        }
    },
    computed: {
        isFormInvalid() {
            return !this.pageTitle || !this.content || !this.linkText || !this.linkUrl;
        }
    },
    data() {
        return {
            pageTitle: '',
            content: '',
            linkText: '',
            linkUrl: '',
            published: false
        };
    },   
    methods: {
        submitForm() {
            if (this.isFormInvalid) {
                alert('Please fill out all fields');
                return;
            }


            this.$emit('pageCreated', {
                pageTitle: this.pageTitle,
                content: this.content,
                link: {
                    text: this.linkText,
                    url: this.linkUrl
                },
                published: this.published
            });

            // Clear the form after submission
            this.pageTitle = '';
            this.content = '';
            this.linkText = '';
            this.linkUrl = '';
            this.published = false;
        }
    },
    watch: {
        pageTitle(newTitle, oldTitle) {
            if (this.linkText === oldTitle) {
                this.linkText = newTitle;
            }
        }
    }
};
</script>
