export default {
    template: `
    <div>
    <section class="blue" id="blue"></section>
	<h1>Welcome to Chat Room</h1>

	<img src="images/logo.svg" alt="Chat Room Logo" id="logo-main">

	<section class="form-container-login">
		<form>
			<label for="nickname"></label>
			<input v-model="input.username" type="text" id="nickname" class="nickname logininput" placeholder="Username">

			<label for="Name"></label>
			<input type="text" id="fName" class="name logininput" placeholder="First Name">

			<label for="Name"></label>
			<input type="text" id="lName" class="name logininput" placeholder="Last Name">
			<button @click="loadChat" class="button" id="button-login">Enter</button>
		</form>
    </section>
    </div>
    `,

    data() {
        return {
            input: {
                username: ""
            },

        }
    },

    methods: {
        loadChat(){
            this.$router.push({name: "login", params: { username: this.input.username }})
        }
    }
}