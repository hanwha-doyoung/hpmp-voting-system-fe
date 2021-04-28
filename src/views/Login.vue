<template>
    <v-app>
        <v-card style="border-color: transparent" outlined>
            <v-layout column>
                <v-container style="margin: 7vh 0 5vh 0"/>
                <v-flex align-self-center style="margin-bottom: 8vh">
                    <v-img src="@/assets/vote_logo.png"></v-img>
                </v-flex>
                <v-container style="height: 4vh"/>
                <v-flex align-self-center style="width: 85%">
                    <v-alert class="mb-3" :value="isLoginError" type="error">아이디와 비밀번호를 확인해주세요.</v-alert>
                    <v-text-field flat solo background-color="rgb(245,246,250)"
                                  style="border-radius: 10px; font-size: larger" placeholder="ID" clearable
                                  v-model="id"
                                  @focus="onFocus"
                    ></v-text-field>
                </v-flex>
                <v-flex align-self-center style="width: 85%">
                    <v-text-field flat solo background-color="rgb(245,246,250)"
                                  style="border-radius: 10px; font-size: larger" placeholder="PASSWORD" clearable
                                  v-model="password" type="password" @keyup.enter="login(id, password)"
                                  @focus="onFocus"
                    ></v-text-field>
                </v-flex>
                <v-container style="height: 5vh"/>
                <v-flex align-self-center style="width: 85%">
                    <v-btn block large style="font-size: large" v-bind:disabled="!id || !password"
                           v-bind:dark="!(!id || !password)" @click="login(id, password)">로그인
                    </v-btn>
                </v-flex>
                <v-container/>
                <v-container/>
            </v-layout>
        </v-card>
        <v-footer padless fixed absolute color="transparent" inset>
            <v-col class="text-center" cols="12">
                {{ new Date().getFullYear() }} — <strong>Blockchain Unit</strong>
            </v-col>
        </v-footer>
    </v-app>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        data() {
            return {
                id: null,
                password: null,
                dialog: false,
                userInfo: null,
            };
        },
        methods: {
            login(id, password) {
                const self = this;
                this.$store.dispatch("login/login", {id, password})
                    .then(function () {
                        if (self.$store.state.login.isLoginError == false) {
                            self.$router.push({name:"MainTab"});
                        }
                    });
            },
            onFocus(){
                this.$store.commit('login/LOGIN_ERROR_RESET');
            }
        },
        computed: {
            ...mapState({
                isLoginError: state => state.login.isLoginError
            }),
        }
    };
</script>