<template>
    <div class="container">
        <div class="row text-center">
            <div class="col-md-12 chat-window scrollbar scrollbar-chat">
                <div class="row">
                    <div class="col-md-12 welcome pb-3">{{greeting}}</div>
                </div>
                <div class="row pt-2" v-for="(a,index) in chat" :id="'top'+(a.nid)" :key="index">
                    <div class="col-md-12">
                        <!-- Display written query -->
                        <div class="row" v-if="a.question">
                            <div class="col mb-2 text-left d-flex justify-content-end">
                                <div class="question">{{a.question}}</div>
                            </div>
                        </div>

                        <!-- Display answers after they are returned by dialogflow -->
                        <div class="row" v-if="Object.keys(a.answer).length > 1">
                            <div class="col-md-9 text-left">
                                <!-- Display all types of answers -->
                                <div
                                    class="row pb-2"
                                    v-for="(res,index) in a.answer.fulfillmentMessages"
                                    :key="index"
                                >
                                    <!-- Display default text message -->
                                    <div class="col-md-12" v-if="res.message == 'text'">
                                        <div class="answerText">{{res.text.text[0]}}</div>
                                    </div>

                                    <!-- Display simple response message -->
                                    <div class="col-md-12" v-if="res.message == 'simpleResponses'">
                                        <div
                                            class="answerText"
                                        >{{res.simpleResponses.simpleResponses[0].textToSpeech}}</div>
                                    </div>

                                    <!-- Display basic card response -->
                                    <div class="col-md-12" v-if="res.message == 'basicCard'">
                                        <div class="card">
                                            <!-- Display image if present -->
                                            <div class="view overlay" v-if="res.basicCard.image">
                                                <img
                                                    class="card-img-top"
                                                    :src="res.basicCard.image.imageUri"
                                                    :alt="res.basicCard.image.accessibilityText"
                                                    v-if="res.basicCard.image.imageUri"
                                                />
                                                <div class="mask rgba-white-slight"></div>
                                            </div>
                                            <div class="card-body">
                                                <h4
                                                    class="card-title"
                                                    v-if="res.basicCard.title"
                                                >{{res.basicCard.title}}</h4>
                                                <p
                                                    class="card-text"
                                                    v-if="res.basicCard.subtitle"
                                                >{{res.basicCard.subtitle}}</p>
                                                <p
                                                    class="card-text"
                                                    v-if="res.basicCard.formattedText && res.basicCard.formattedText != res.basicCard.subtitle"
                                                >{{res.basicCard.formattedText}}</p>
                                                <!-- Display card buttons -->
                                                <div
                                                    v-for="(s,index) in res.basicCard.buttons"
                                                    :key="index"
                                                >
                                                    <template v-if="s.openUriAction">
                                                        <div class="suggestions link">
                                                            <a
                                                                :href="s.openUriAction.uri"
                                                                target="_blank"
                                                            >
                                                                {{s.title}}
                                                                <i
                                                                    class="fas fa-external-link-alt"
                                                                    style="margin-left:3px;"
                                                                ></i>
                                                            </a>
                                                        </div>
                                                    </template>
                                                    <template v-else>
                                                        <div
                                                            @click="clickSubmit(s.title)"
                                                            v-if="s.title"
                                                            class="suggestions"
                                                        >{{s.title}}</div>
                                                    </template>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Display Select List response -->
                                    <div class="col-md-12" v-if="res.message == 'listSelect'">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4
                                                    class="card-title"
                                                    v-if="res.listSelect.title"
                                                >{{res.listSelect.title}}</h4>
                                                <p
                                                    class="card-text"
                                                    v-if="res.listSelect.subtitle"
                                                >{{res.listSelect.subtitle}}</p>
                                                <template v-if="res.listSelect.items.length > 1">
                                                    <ul class="list-group">
                                                        <li
                                                            v-for="(s,index) in res.listSelect.items"
                                                            :key="index"
                                                            class="list-group-item flex-column align-items-start"
                                                            @click="clickSubmit(s.title)"
                                                        >
                                                            <div class="row">
                                                                <template
                                                                    v-if="s.image.imageUri != ''"
                                                                >
                                                                    <div class="col-md-9">
                                                                        <div
                                                                            class="d-flex w-100 justify-content-between"
                                                                            v-if="s.title"
                                                                        >
                                                                            <h5
                                                                                class="h5 mb-0"
                                                                            >{{s.title}}</h5>
                                                                        </div>
                                                                        <p
                                                                            class="mt-2 mb-0"
                                                                            v-if="s.description"
                                                                        >{{s.description}}</p>
                                                                    </div>
                                                                    <div class="col-md-3">
                                                                        <img
                                                                            :src="s.image.imageUri"
                                                                            class="img-fluid rounded"
                                                                        />
                                                                    </div>
                                                                </template>
                                                                <template v-else>
                                                                    <div class="col-md-12">
                                                                        <div
                                                                            class="d-flex w-100 justify-content-between"
                                                                            v-if="s.title"
                                                                        >
                                                                            <h5
                                                                                class="h5 mb-0"
                                                                            >{{s.title}}</h5>
                                                                        </div>
                                                                        <p
                                                                            class="mt-2 mb-0"
                                                                            v-if="s.description"
                                                                        >{{s.description}}</p>
                                                                    </div>
                                                                </template>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </template>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Display default card response -->
                                    <div class="col-md-12" v-if="res.message == 'card'">
                                        <div class="card">
                                            <!-- Display image if present -->
                                            <div class="view overlay" v-if="res.card.imageUri">
                                                <img class="card-img-top" :src="res.card.imageUri" />
                                                <div class="mask rgba-white-slight"></div>
                                            </div>
                                            <div class="card-body">
                                                <h4
                                                    class="card-title"
                                                    v-if="res.card.title"
                                                >{{res.card.title}}</h4>
                                                <p
                                                    class="card-text"
                                                    v-if="res.card.subtitle"
                                                >{{res.card.subtitle}}</p>

                                                <!-- Display card buttons -->
                                                <div
                                                    v-for="(s,index) in res.card.buttons"
                                                    :key="index"
                                                >
                                                    <div
                                                        @click="clickSubmit(s.postback)"
                                                        v-if="s.postback"
                                                        class="suggestions"
                                                    >{{s.postback}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Display image only -->
                                    <div class="col-md-12" v-if="res.message == 'image'">
                                        <div class="card">
                                            <!-- Display image if present -->
                                            <div class="view overlay" v-if="res.image.imageUri">
                                                <img
                                                    class="card-img-top image-only"
                                                    :src="res.image.imageUri"
                                                />
                                                <div class="mask rgba-white-slight"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Display Suggestion chip -->
                                    <div class="col-md-12" v-if="res.message == 'suggestions'">
                                        <div
                                            v-for="(s,index) in res.suggestions.suggestions"
                                            :key="index"
                                            class="suggestions"
                                            @click="clickSubmit(s.title)"
                                        >
                                            <div v-if="s.title">{{s.title}}</div>
                                        </div>
                                    </div>

                                    <!-- Display Quick Reply chip -->
                                    <div class="col-md-12" v-if="res.message == 'quickReplies'">
                                        <div
                                            v-for="(s,index) in res.quickReplies.quickReplies"
                                            :key="index"
                                            class="suggestions"
                                            @click="clickSubmit(s)"
                                        >
                                            <div v-if="s">{{s}}</div>
                                        </div>
                                    </div>

                                    <!-- Display Link Out Suggestion chip -->
                                    <div
                                        class="col-md-12"
                                        v-if="res.message == 'linkOutSuggestion'"
                                    >
                                        <div class="suggestions link">
                                            <div v-if="res.linkOutSuggestion">
                                                <a
                                                    :href="res.linkOutSuggestion.uri"
                                                    target="_blank"
                                                >
                                                    {{res.linkOutSuggestion.destinationName}}
                                                    <i
                                                        class="fas fa-external-link-alt"
                                                        style="margin-left:3px;"
                                                    ></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Display Carousel card response -->
                                    <div class="col-md-12" v-if="res.message == 'carouselSelect'">
                                        <div
                                            id="carousel-cards"
                                            class="carousel slide carousel-fade"
                                            data-ride="carousel"
                                        >
                                            <ol class="carousel-indicators">
                                                <template v-for="s in res.carouselSelect.items">
                                                    <li
                                                        data-target="#carousel-cards"
                                                        :data-slide-to="s.info.key"
                                                        :class="{ active: s.info.key == 1 }"
                                                        :key="s.info.key"
                                                    ></li>
                                                </template>
                                            </ol>
                                            <div class="carousel-inner" role="listbox">
                                                <template v-for="s in res.carouselSelect.items">
                                                    <div
                                                        class="carousel-item"
                                                        :class="{ active: s.info.key == 1 }"
                                                        :key="s.info.key"
                                                    >
                                                        <div class="view">
                                                            <img
                                                                class="d-block w-100"
                                                                :src="s.image.imageUri"
                                                            />
                                                            <div class="mask rgba-black-light"></div>
                                                        </div>
                                                        <div class="carousel-caption">
                                                            <h3
                                                                class="h3-responsive"
                                                                v-if="s.title"
                                                            >{{s.title}}</h3>
                                                            <p
                                                                v-if="s.description"
                                                            >{{s.description}}</p>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                            <a
                                                class="carousel-control-prev"
                                                href="#carousel-cards"
                                                role="button"
                                                data-slide="prev"
                                            >
                                                <span
                                                    class="carousel-control-prev-icon"
                                                    aria-hidden="true"
                                                ></span>
                                                <span class="sr-only">Previous</span>
                                            </a>
                                            <a
                                                class="carousel-control-next"
                                                href="#carousel-cards"
                                                role="button"
                                                data-slide="next"
                                            >
                                                <span
                                                    class="carousel-control-next-icon"
                                                    aria-hidden="true"
                                                ></span>
                                                <span class="sr-only">Next</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="col-md-3">
                                <div class="d-flex justify-content-start" style="height:100%">
                                    <div class="like-dislike">
                                        <i class="fas fa-thumbs-up like"></i>
                                        <i class="fas fa-thumbs-down dislike"></i>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                        <div class="row" v-else>
                            <div class="col md-8 text-left">
                                <div class="loader">
                                    <img src="../assets/typing.svg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="bottom"></div>
                <div class="row">
                    <div class="col-md-12 time-date">
                        <div class="row">
                            <div class="col-md-6">
                                <p class="time">
                                    {{ time }}
                                    <br />
                                </p>
                                <p class="date">{{ date }}</p>
                            </div>
                            <div class="col-md-6">
                                <p class="copyright">
                                    Proudly powered by
                                    <a
                                        href="https://amangarg.firebaseapp.com"
                                        target="_blank"
                                    >{{config.locale.strings.author}}</a>
                                    <br />
                                </p>
                                <p class="copyright-version">version: 1.0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-10 col-sm-10 col-10 search">
                <input
                    type="text"
                    :placeholder="config.locale.strings.queryTitle"
                    v-model="query"
                    @keyup.enter="submit"
                    :disabled="!!queryFlag"
                    id="queryinput"
                    autofocus
                />
            </div>
            <div class="col-md-2 col-sm-2 col-2 text-center" v-show="query != ''">
                <div class="send" @click="submit">
                    <i class="fas fa-arrow-right"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import uuidv4 from "uuid/v4";
import axios from "axios";
import config from "../../config";
const sessionId = uuidv4();
const langCode = config.locale.settings.recognitionLang;
let chatUrl = config.app.dialogflowUrl;
let agent = config.Dialogflow.agent;
export default {
    data() {
        return {
            config,
            chat: [],
            query: "",
            time: "0",
            date: "0",
            week: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            greeting: "",
            id: 1,
            queryFlag: false
        };
    },
    methods: {
        submit() {
            let vm = this;
            if (vm.query) {
                setTimeout(() => {
                    document.querySelector("#bottom").scrollIntoView({
                        behavior: "smooth"
                    });
                }, 2);
                let temp = {};
                temp.question = vm.query;
                temp.nid = vm.id;
                temp.answer = {};
                vm.chat.push(temp);
                vm.queryFlag = true;
                axios({
                    method: "get",
                    url: chatUrl + "/detect",
                    params: {
                        sessionId,
                        query: vm.query,
                        langCode,
                        agent
                    }
                }).then(response => {
                    response = response.data;
                    vm.chat[vm.id - 1].answer = response.queryResult;
                    vm.scroll();
                    vm.id++;
                    vm.query = "";
                    vm.queryFlag = false;
                    document.getElementById("queryinput").focus();
                    $("#queryinput").focus();
                });
            }
        },
        clickSubmit(keyword) {
            let vm = this;
            vm.query = keyword;
            vm.submit();
        },
        scroll() {
            let vm = this;
            let id = "#top" + vm.id;
            setTimeout(() => {
                document.querySelector(id).scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest"
                });
            }, 2);
        },
        updateTime() {
            let cd = new Date();
            let hrs = cd.getHours();
            let ampm = hrs >= 12 ? "PM" : "AM";
            hrs = hrs % 12;
            hrs = hrs ? hrs : 12;
            this.time =
                this.zeroPadding(hrs, 2) +
                ":" +
                this.zeroPadding(cd.getMinutes(), 2) +
                ":" +
                this.zeroPadding(cd.getSeconds(), 2) +
                " " +
                ampm;
            this.date =
                this.zeroPadding(cd.getFullYear(), 4) +
                "-" +
                this.zeroPadding(cd.getMonth() + 1, 2) +
                "-" +
                this.zeroPadding(cd.getDate(), 2) +
                " " +
                this.week[cd.getDay()];
        },
        zeroPadding(num, digit) {
            let zero = "";
            for (let i = 0; i < digit; i++) {
                zero += "0";
            }
            return (zero + num).slice(-digit);
        }
    },
    mounted() {
        let vm = this;
        vm.updateTime();
        setInterval(() => {
            vm.updateTime();
        }, 1000);

        let time = new Date().getHours();
        if (time < 12 && time >= 0) {
            vm.greeting = "Good Morning";
        } else if (time >= 16) {
            vm.greeting = "Good Evening";
        } else if (time >= 12) {
            vm.greeting = "Good Afternoon";
        } else {
            vm.greeting = "Hi";
        }

    }
};
</script>

<style lang="scss" scoped>
@import "../Chat.scss";
</style>