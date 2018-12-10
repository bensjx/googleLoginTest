<template>
  <div id="app">
    <md-app md-waterfall md-mode="flexible">
      <md-app-content class="content">
        <md-card>
          <div class="md-layout input-bar">
            <md-field class="md-layout-item">
              <label>Question</label>
              <md-input
                v-model="question"
                placeholder="Type your question here.."
                @keyup.enter="addQuestion"
              ></md-input>
            </md-field>
            <md-button
              id="ask-question-button"
              class="md-raised md-primary md-layout-item md-size-15"
              @click="addQuestion"
              >Ask</md-button
            >
          </div>
        </md-card>
        <md-card
          v-for="(item, idx) in questions"
          :key="idx"
          style="margin-top:10px;"
        >
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">{{ item.question }}</div>
              <div class="md-subhead">
                {{ item.askedBy }} <br />
                {{ item.timestamp | moment("from") }}
              </div>
            </md-card-header-text>

            <md-card-media>
              <md-avatar
                class="md-avatar-icon md-large"
                :style="inputStyles(item.askedBy.charAt(0).toUpperCase())"
              >
                <md-ripple>{{
                  item.askedBy.charAt(0).toUpperCase()
                }}</md-ripple>
              </md-avatar>
            </md-card-media>
          </md-card-header>
          <md-card-actions>
            <md-button
              @click="
                showDialog = true;
                setCurrentItem(item);
              "
              >Answer</md-button
            >
            ({{ typeof item.answers == "undefined" ? 0 : item.answers.length }})
            <md-button @click="deleteQuestion(item);">Delete</md-button>
          </md-card-actions>
          <md-dialog :md-active.sync="showDialog">
            <md-dialog-title class="md-display-1">{{
              currentItem.question
            }}</md-dialog-title>
            <md-tabs>
              <md-tab md-label="View Answers">
                <md-content class="md-scrollbar" id="answers">
                  <span class="md-title"> Answers </span>
                  <span
                    class="md-subhead"
                    v-if="!currentItem.answers"
                    style="color: #808080 "
                    ><br />No answers yet. Check back later.</span
                  >
                  <ul
                    v-for="(test, ansIndex) in currentItem.answers"
                    :key="ansIndex"
                  >
                    <li>
                      {{ test.answer }} - answered by {{ test.answeredBy }}
                      {{ test.timestamp | moment("from") }}
                    </li>
                  </ul>
                </md-content>
              </md-tab>
              <md-tab md-label="Add Answer">
                <md-field class="messageClass">
                  <label>Answer</label>
                  <md-textarea
                    v-model="textarea"
                    md-counter="200"
                    required
                  ></md-textarea>
                </md-field>
              </md-tab>
            </md-tabs>

            <md-dialog-actions>
              <md-button class="md-primary" @click="showDialog = false;"
                >Close</md-button
              >
              <md-button
                class="md-primary"
                @click="saveAnswer(currentItem, textarea);"
                >Save</md-button
              >
            </md-dialog-actions>
          </md-dialog>
        </md-card>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { db } from "../firebase";
import Header from "./Header.vue";

export default {
  name: "app",
  data() {
    return {
      qaforum: [],
      question: "",
      askedBy: "",
      answers: [],
      showDialog: false,
      textarea: "",
      currentItem: "",
      currentUser: ""
    };
  },
  firestore() {
    return {
      qaforum: db.collection("qaforum"),
      questions: db.collection("qaforum").orderBy("timestamp", "desc")
    };
  },
  methods: {
    addQuestion: function() {
      this.$firestore.qaforum.add({
        question: this.question,
        timestamp: new Date(),
        askedBy: this.$store.getters.getUser.email
      });
      this.question = "";
    },
    deleteQuestion: function(item) {
      this.$firestore.qaforum.doc(item[".key"]).delete();
    },
    saveAnswer: function(item, user_answer) {
      this.showDialog = false;
      this.$firestore.qaforum
        .doc(item[".key"])
        .get()
        .then(doc => {
          var data = doc.data();
          var doc_answers = data["answers"];

          if (!doc_answers) {
            doc_answers = [];
          }

          doc_answers.push({
            answer: user_answer,
            timestamp: new Date(),
            answeredBy: this.$store.getters.getUser.email
          });

          this.$firestore.qaforum.doc(item[".key"]).update({
            answers: doc_answers
          });
        });

      this.textarea = null;
    },
    setCurrentItem: function(item) {
      this.currentItem = item;
    },
    setUser: function() {
      this.$store.dispatch("setUser");
      console.log(this.$store.getters.getUser.email);
    },
    inputStyles: function(startingChar) {
      var metroColors = [
        "#008299",
        "#00A0B1",
        "#2672EC",
        "#2E8DEF",
        "#8C0095",
        "#A700AE",
        "#5133AB",
        "#643EBF",
        "#AC193D",
        "#BF1E4B",
        "#D24726",
        "#DC572E",
        "#008A00",
        "#00A600",
        "#094AB2",
        "#0A5BC4"
      ];
      var color =
        metroColors[
          Math.floor(
            ((startingChar.charCodeAt(0) - 65.0) * metroColors.length) / 26.0
          )
        ];
      return {
        background: color
      };
    }
  },
  components: {
    navMain: Header
  },
  created() {
    // when the app is created run the set user method
    // this uses Vuex to check if a user is signed in
    // check out mutations in the store.js file
    this.setUser();

    this.currentUser = this.$store.getters.getUser.email;
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
#ask-question-button {
  z-index: 1;
}

.md-app {
  // max-height: 100vh;
  border: 1px solid rgba(#000, 0.12);
}

.content {
  padding-left: 10px;
  padding-right: 10px;
}

.md-dialog {
  padding: 20px;
}

.md-dialog-title {
  padding: 0px;
  color: black;
}

.input-bar {
  margin-left: 20px;
}

#answers {
  max-height: 275px;
  overflow: auto;
}
</style>
