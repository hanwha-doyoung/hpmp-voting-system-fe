<template>
    <v-navigation-drawer v-model="status" temporary right app width="75%">
        <v-col align="right" style="height: 60px">
            <v-btn icon @click.stop="navigationOff()">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-col>
        <v-list>
            <v-list-item-group v-if="user">
                <v-list-item>
                    <v-row justify="space-around">
                        <v-avatar color="#a76666">
                            <span class="white--text headline" style="font-size: x-large; font-weight: bold" v-if="user">{{ user.charAt(0) }}</span>
                        </v-avatar>
                    </v-row>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title align="center" style="font-weight: bold; font-size: xx-large">{{ user }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        <v-divider/>
        <v-container fluid style="padding: 6% 10% 0 10%">
            <v-layout column>
                <v-row class="text-center" v-if="showCreate">
                    <v-btn depressed height="60" style="margin-top: 20px" block @click.stop="goNextStep('create')">
                        <v-img src='@/assets/create.png'></v-img>
                        <div style=" width: 100%; font-size:large; font-weight: bold; padding-right:40px;">투표 생성</div>
                    </v-btn>
                </v-row>
                <v-container v-if="showCreate" style="padding-top: 6px"/>
            </v-layout>
        </v-container>
        <v-footer color="white" absolute>
            <v-col class="text-center">
                <v-btn depressed outlined style="border-color: transparent" @click="logout()">
                    <v-img src="@/assets/icLogout.png"></v-img>
                    <span style="margin-left: 6px">로그아웃</span>
                </v-btn>
            </v-col>
        </v-footer>
    </v-navigation-drawer>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        computed: {
            ...mapState({
                user: state => state.common.userName,
            }),
            status: {
                get() {
                    return this.$store.state.common.navigation_tab;
                },
                set(val) {
                    this.$store.commit('common/SET_NAVIGATION_TAB', val);
                }
            },
            showCreate() {
                return ['admin'].includes(localStorage.uid)
            }
            
        },
        data() {
            return {
                showAdmin: ['admin'].includes(localStorage.uid),
            }
        },
        methods: {
            navigationOff: function () {
                this.$store.dispatch('common/setNavigationTab', 'off');
            },
            routerLink(path) {
                if (this.$route.path !== path) {
                    this.$router.push(path);
                }
            },
            goNextStep: function(dialog) {
                if(dialog == 'create') {
                    if(this.showAdmin) {
                        this.$store.dispatch('common/setModalNavigation', 'on');
                        this.$store.dispatch('common/setNavigationTab', 'off');
                    }
                }
            },
            logout() {
                const self = this;
                this.$store.dispatch("login/logout").then(function () {
                    self.$router.push({name: "Login"});
                });
            },
            
        },
    }
</script>
