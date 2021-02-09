<template>
    <ul class="chat-view">
        <li v-for="(msg, index) in messages"
            v-bind:key="index"
            class="chat-view__item">
            <time class="chat-view__time">
                {{msg.time}} - {{msg.date}}
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
</template>

<script>
    export default {
        props : {
            messages : Array
        }
    }
</script>