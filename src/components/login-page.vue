<template>
  <div class="container">
    <div class="img-container">
      <img class="img-logo-big" src="../assets/Group.svg" alt="Logo-2" />
      <img class="img-logo-small" src="../assets/Frame.svg" alt="Logo-1" />
    </div>

    <Form
      @submit="handleLogin"
      :validation-schema="schema"
      class="login-container"
    >
      <div class="form-login">
        <div>
          <h5>BIENVENIDO ESPECIALISTA</h5>
          <div>
            <div class="control-container">
              <vue-feather type="user"></vue-feather>
              <Field
                name="username"
                type="text"
                class="control-field"
                placeholder="Username"
              />
            </div>

            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="control-container">
            <vue-feather type="key"></vue-feather>
            <Field
              name="password"
              type="password"
              class="control-field"
              placeholder="Password"
            />
            <ErrorMessage name="password" class="error-feedback" />
          </div>

          <button class="btn button btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>INICIAR SESIÓN</span>
          </button>
          <p href="#" class="pass-forgot">¿Olvidó su Contraseña?</p>
        </div>
      </div>
    </Form>
  </div>
</template>


<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "login-page",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/home");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 60px);
  min-height: 400px;
  align-items: center;
  margin: 30px auto;
  background: #ffffff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
}
@media (min-width: 920px) {
  .img-container {
    position: relative;
  }
  .img-logo-small {
    position: absolute;
    top: 15px;
  }
}

.img-container {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
}
.img-logo-small {
  width: 180px;
  height: 56px;
}
.img-logo-big {
  margin: auto;
  display: block;
}
.login-container {
  width: 100%;
  flex: 1;
  padding: 0 50px;
}
.form-login {
  display: flex;
  flex-direction: column;
  height: 340px;

  color: #c4c4c4;
}

.form-login h5 {
  font-family: "Bebas Neue", cursive;
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  line-height: 48px;

  letter-spacing: 0.02em;
  color: #5492fd;
  margin: 0;
  text-align: center;

  margin-bottom: 30px;
}
.control-container {
  display: flex;
  flex-direction: row;
  background: #ffffff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);
  border-radius: 50px;
  padding: 16px 20px;
  align-items: center;
  column-gap: 20px;
  margin-bottom: 20px;
}
.control-field {
  width: 80%;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 400;
}
.icon-field {
  align-items: center;
  font-size: 20px;
  width: 5%;
}

.button {
  background: #5492fd;
  border-radius: 50px;
}
.pass-forgot {
  text-align: center;
  margin-top: 10px;
  color: #c4c4c4;
  font-size: 18px;
  font-family: "Montserrat", sans-serif;
}
@media (max-width: 750px)  {
  .container {
    flex-direction: column;
    height: calc(100% - 10px);
    margin: 15px auto;
    padding-bottom: 60px;
  }
}
@media (min-width: 580px) and (max-width: 992px) {
  .container {
    flex-direction: column;
    height: calc(100% - 10px);
    margin: 15px auto;
    padding-bottom: 60px;
  }
  .img-container {
    align-items: center;
    height: 100%;
  }
}
@media (max-width: 420px) {
  .container {
    flex-direction: column;
    height: calc(100% - 10px);
    margin: 15px auto;
    padding-bottom: 60px;
  }
  .img-container {
    align-items: center;
    height: 100%;
  }
  .img-logo-small {
    margin-bottom: 30px;
  }
  .img-logo-big {
    margin-top: 120px;
  }
  .form-login h5 {
    margin-top: 20px;
    font-size: 30px;
  }
}

</style>