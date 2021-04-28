<template>
    <v-app>
        <Navigation/>
        <v-app-bar app height="54vh">
            <v-spacer></v-spacer>
            <v-icon>mdi-bell-outline</v-icon>
            <v-btn icon @click.stop="navigationOn()">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </v-app-bar>
        <v-container fluid>
            <v-tabs-items v-model="tabIndex" >
            </v-tabs-items>
            <Votes/>
            <CreateVoteModal/>
        </v-container>
        <v-footer padless tile color="transparent" app class="subtitle-2">
            <v-spacer/>
            <span style="margin-right: 2%">v {{ clientVersion }}</span>
        </v-footer>
    </v-app>
</template>

<script>
    import Navigation from "./Navigation";
    import { version } from '../../package.json'
    import CreateVoteModal from "./CreateVoteModal";
    import Votes from "./Votes";

    export default {
        components: { Navigation, CreateVoteModal, Votes },
        computed: {
            tabIndex: {
                get() {
                    return this.$store.state.common.tabIndex;
                },
                set(val) {
                    this.$store.commit('common/SET_TABINDEX', val);
                }
            },
        },
        data() {
            return {
                clientVersion: version,
                showBellButton: true
            }
        },
        methods: {
            navigationOn() {
                this.$store.dispatch('common/setNavigationTab', 'on');
            },
            
        },
    };
</script>
