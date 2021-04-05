<template>
    <div class="screen-view">
        <header class="header">
            <h1 class="header__title">
                <img
                    class="header__icon"
                    src="./../img/logo.png"
                    alt="MSN logo" />

                <span>MSN XML reader</span>
            </h1>

            <nav class="header__nav">
                <template v-if="data">
                    <button v-on:click="getCsv">Get CSV</button>
                    <button v-on:click="getJson">Get JSON</button>
                    <button v-on:click="reset">Reset</button>
                </template>

                <button v-on:click="about = true">About</button>
            </nav>
        </header>

        <section class="screen-view__content">
            <drag-drop
                v-if="!data && !about"
                v-on:update="parseDrop"></drag-drop>

            <chat-view
                v-if="data && !about"
                v-bind:messages="data.messagesFlat"></chat-view>

            <article
                v-if="about"
                class="screen-view__about">
                <button
                    class="screen-view__link"
                    v-on:click="about = false">
                    Close
                </button>

                <p>
                    <strong>This is a tool by <a href="https://www.haykranen.nl">Hay Kranen</a> to read your old MSN Messenger XML chat logs</strong>
                </p>

                <p>
                    Note that all the processing takes place on your own device. No data is transferred to my
                    server (you don't need to worry about me reading your cringy high school chats). If you're paranoid turn off your connection, this tool will still work.
                </p>

                <p>
                    All code is open source and can be found on my <a href="https://github.com/hay/msn-messenger-xml-importer">Github</a> account. Please submit any bugs, features requests and pull requests there. Given that this is a hobby project it might take a while to process your requests.
                </p>

                <p>
                    If you found this tool useful, why not <a href="https://www.haykranen.nl/donate/">support my work</a>?
                </p>

                <a href="https://www.haykranen.nl/donate/" class="btn btn--donate">
                    <img src="./../img/icon.png" alt="MSN logo" />
                    <span>Support my work</span>
                </a>
            </article>
        </section>
    </div>
</template>

<script>
    import ChatView from './chat-view.vue';
    import DragDrop from './drag-drop.vue';

    export default {
        components : { ChatView, DragDrop },

        data() {
            return {
                about : false,
                data : null
            };
        },

        methods : {
            downloadFile(data, type) {
                const blob = new Blob([ data ], { type : `text/${type}` });
                const file = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = file;
                a.download = `msn.${type}`;
                a.click();
            },

            getCsv() {
                this.downloadFile(this.data.getCsv(), 'csv');
            },

            getJson() {
                this.downloadFile(this.data.getJson(), 'json');
            },

            reset() {
                this.data = null;
            },

            async parseDrop(msnData) {
                this.data = msnData;
            }
        }
    }
</script>