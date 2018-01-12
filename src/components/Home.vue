<template>
    <v-container fluid grid-list-sm>
        <h1 class="text-xs-center nyt" style="font-size: 72px; margin-top: 10px; margin-bottom: 30px">NYT Newswire</h1>

        <span v-if="loading" class="nyt loading">Loading&nbsp;
            <pulse-loader style="display: inline-block"></pulse-loader>
        </span>

        <v-layout row wrap class="full-height">
            <v-flex xs12 sm4 md3 v-for="i in totalCards" :key="i">
                <v-layout column>
                    <v-flex d-flex>

                        <v-card :href="getHref(i)" class="post" style="margin: 2px;" color="blue-grey darken-3" tile raised>
                            <v-card-media src="/static/docks.jpg" height="200px">
                            </v-card-media>
                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0">
                                        <p v-dummy="3,8"></p>
                                    </h3>
                                    <div>
                                        <p v-dummy="20,60"></p>
                                    </div>
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
// import { apiKeys } from '@/data/api-keys'
import axios from 'axios'
export default {
    mounted() {
        // console.table({ apiKeys })
        // axios.get('/static/data/mock.json')
        //     .then(function(response) {
        //         console.log(response);
        //     })
        //     .catch(function(error) {
        //         console.log(error);
        //     });
    },
    methods: {
        showAbstract: function(i) {
            this.show[i - 1] = !this.show[i - 1]
            // Find better way?
            this.$forceUpdate()
        },

        getHref: function(x) {
            return x.toString();
        }

    },
    components: {
        PulseLoader
    },

    data() {
        return {
            show: false,
            totalCards: 25,
            show: [],
            loading: false,
            test: "1"
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

.loading {
    font-size: 45px;
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
</style>