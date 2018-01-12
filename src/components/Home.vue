<template>
    <v-container fluid grid-list-sm style="margin-bottom: 35px">
        <h1 class="text-xs-center nyt" style="font-size: 80px; margin-top: 10px; margin-bottom: 10px">NYT Top Stories</h1>

        <div class="loader">
            <span v-if="loading" class="nyt">
                <pulse-loader style="display: inline-block"></pulse-loader>
            </span>
        </div>





        <div style="margin: 0 auto; text-align: center; margin-bottom: 50px">

            <div style="margin-bottom: 40px; margin: 0 auto;">
                <v-select v-bind:items="sections" @change="changeSection" v-model="section" label="Current section" autocomplete style="width: 350px; font-size: 30px; color: #555; margin: 0 auto;"
                    class="nyt"></v-select>
                <div style="margin-top: -20px; font-size: 12px; color: #bbb">Updated: {{lastUpdated}}</div>
            </div>

            <div v-if="errors">
                <h1 class="nyt" style="color: red">Error fetching data</h1>
            </div>

        </div>

        <div style="clear: both"></div>





        <v-layout row wrap class="full-height" v-if="!errors">
            <v-flex xs12 sm4 md3 v-for="result in results" :key="result.uuid">
                <v-layout column>
                    <v-flex d-flex>

                        <v-card :href="result.url" class="post" style="margin: 2px;" color="blue-grey darken-3" tile raised>
                            <v-card-media :src="result.image_url" height="200px">
                            </v-card-media>
                           
                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0">
                                        <p class="nyt">{{result.title}}</p>
                                    </h3>
                                    
                                    <div>
                                        <p>{{result.abstract}}</p>
                                    </div>
                                    <span class="grey--text">{{makeFriendlyDate(result.published_date)}}</span>
                                </div>
                            </v-card-title>

                        </v-card>
                    </v-flex>

                </v-layout>
            </v-flex>

        </v-layout>
    </v-container>
</template>


<script>
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import { apiKeys } from '@/api-keys.js'
    import axios from 'axios'
    import uuidv4 from 'uuid/v4';
    import dateFormat from 'dateformat'

    export default {
        mounted() {
            this.section = 'Home'
            this.fetchArticles(this.section)


        },
        methods: {
            makeFriendlyDate: function (d) {
                // return dateFormat(d, "dddd, mmmm dS, yyyy, h:MM:ss TT");
                return dateFormat(d, "dddd, mmmm dS, yyyy, h:MM TT");
            },
            getHref: function (x) {
                return x.toString();
            },
            changeSection: function (e) {
                this.section = e
                this.loading = true;
                this.fetchArticles(this.section)
            },
            fetchArticles: function (section) {
                let vm = this
                section = section.toLowerCase().replace(/\s/g, '');
                console.log(section)
                let url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKeys.topStories}`
                axios.get(url)
                    .then(function (response) {
                        //console.log(response);
                        vm.loading = false;
                        vm.results = response.data.results
                        vm.lastUpdated = dateFormat(response.data.last_updated, "dddd, mmmm dS, yyyy, h:MM:ss TT");
                        vm.processPosts();
                    })
                    .catch(function (error) {
                        vm.errors = true
                        console.log(error);
                        vm.$forceUpdate();
                    });
            },
            processPosts: function () {
                let vm = this
                let posts = this.results;
                // Add image_url attribute
                posts.map(post => {
                    let imgObj = post.multimedia.find(media => media.format === "superJumbo");
                    post.image_url = imgObj ? imgObj.url : "http://placehold.it/300x200?text=N/A";
                    post.uuid = uuidv4();
                    post.lastUpdated = vm.lastUpdated
                });
                this.results = posts

            }


        },
        computed: {
            processedPosts() {


            }

        },
        components: {
            PulseLoader
        },

        data() {
            return {
                section: 'Home',
                show: false,
                totalCards: 25,
                loading: true,
                errors: false,
                lastUpdated: null,
                results: [],
                a1: null,
                sections: [
                    'Home', 'Opinion', 'World', 'National', 'Politics', 'Upshot', 'Business', 'Technology', 'Science', 'Health', 'Sports', 'Arts', 'Books', 'Movies', 'Theater', 'Sunday Review', 'Fashion', 'T Magazine', 'Food', 'Travel', 'Magazine', 'Real Eastate', 'Automobiles', 'Insider'
                ]
            }
        }
    }
</script>

<style scss>
    .nyt {
        font-family: 'Bevan', cursive;
    }

    .full-height .flex {
        display: flex
    }

    .full-height .flex>.card {
        flex: 1 1 auto
    }



    .loader {
        position: absolute;
        right: 5px;
        top: 5px;
    }

    .post:hover {
        box-shadow: 0px 0px 150px #000000;
        z-index: 2;
        -webkit-transition: all 200ms ease-in;
        -webkit-transform: scale(1.1);
        -ms-transition: all 200ms ease-in;
        -ms-transform: scale(1.1);
        -moz-transition: all 200ms ease-in;
        -moz-transform: scale(1.1);
        transition: all 200ms ease-in;
        transform: scale(1.1);
        cursor: pointer;
    }

    .input-group--select .input-group__selections__comma {

        font-size: 25px;
        color: #bbb !important;

    }

    .input-group--select.input-group--focused .input-group--select__autocomplete {

        font-size: 25px;
        color: #bbb !important;
    }

    .input-group__input {
        min-height: 50px;
    }

    .fade {
        color: #fff
    }
</style>