var messageApi = Vue.resource('/message{/id}');

Vue.component('message-rol', {
    props: ['message'],
    template: '<div><i>({{message.id}})</i> {{ message.text }}</div>div>'
});

Vue.component('messages-list', {
    props: ['messages'],
    template: '<div><message-rol v-for="message in messages" :key="message.id" :message="message"/></div>',
    created: function () {
        messageApi.get().then(result =>
            result.json().then( data =>
                data.forEach(message => this.messages.push(message))
            )
        )
    }
});

var app = new Vue({
    el: '#app',
    template: '<messages-list :messages="messages" />',
    data: {
        messages: []
    }
});