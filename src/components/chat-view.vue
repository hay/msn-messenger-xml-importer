<template>
    <div class="chat-view">
        <div class="chat-view__info">
            Displaying {{messages.length}} messages
        </div>

        <ul class="chat-view__list">
            <li v-for="(msg, index) in messages"
                v-bind:key="index"
                class="chat-view__item">
                <time class="chat-view__time">
                    {{msg.date}} - {{msg.time}}
                </time>

                <span class="chat-view__user">
                    {{msg.from}}
                </span>

                <p class="chat-view__text"
                   v-bind:style="msg.text_style">
                    {{msg.text}}
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props : {
            messages : Array
        }
    }
</script>