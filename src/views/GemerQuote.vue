<template>
  <h1>The ANIME QUOTER</h1>
  <div class="content">
    <!-- Displaying the content of the last chosen quote -->
    <textarea
      name="quot"
      id="quot"
      v-model="lastQuot.content"
      readonly
    ></textarea>
    <textarea
      name="author"
      id="author"
      v-model="lastQuot.author"
      readonly
    ></textarea>
    <button class="btn" @click="choseQuot">GET A NEW QUOTE</button>

    <!-- Displaying all chosen quotes -->
    <div class="Quots" v-for="quot in chosinQuots" :key="quot._id">
      <p>{{ quot.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quots: [],
      chosinQuots: [],
    };
  },

  computed: {
    lastQuot() {
      return this.chosinQuots.length > 0
        ? this.chosinQuots[this.chosinQuots.length - 1]
        : { content: "", author: "" };
    },
  },

  methods: {
    async getQuot() {
      try {
        const response = await fetch(
          "https://api.quotable.io/quotes?limit=100"
        );
        const data = await response.json();
        this.quots = data.results;
      } catch (error) {
        alert("There was an error fetching quotes: " + error.message);
      }
    },
    choseQuot() {
      if (this.quots.length > 0) {
        const randomIndex = Math.floor(Math.random() * this.quots.length);
        this.chosinQuots.push(this.quots[randomIndex]);
      } else {
        alert("No quotes available to choose from.");
      }
    },
  },

  mounted() {
    this.getQuot();
  },
};
</script>
<style scoped lang="scss">
h1 {
  text-decoration: underline red 3px;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  #quot {
    resize: none;
    width: 70%;
    height: 200px;
    padding: 10px;
    background-color: black;
    color: white;
    font-size: 23px;
    border: none;
    border-radius: 40px;
  }
  #author {
    resize: none;
    position: absolute;
    width: 140px;
    z-index: 1;
    top: 290px;
    color: white;
    padding: 3px;
    background-color: blueviolet;
    font-size: 17px;
    margin-left: 60%;
    border-radius: 20px;
    border: none;
  }
  .btn {
    background-color: rgb(170, 43, 102);
    border: none;
    border-radius: 10px;
    width: 30%;
    height: 50px;
    font-size: 20px;
    margin-top: 10%;
    color: white;
  }
  p {
    background-color: rgb(150, 149, 149);
    color: black;
    border-radius: 10px;
    font-size: 20px;
    text-align: start;
    padding: 5px;
  }
}
</style>
