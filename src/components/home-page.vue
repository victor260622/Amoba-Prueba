<template>
  <img src="../assets/Frame.svg" />
  <div class="container jumbotron dddd">
    <div class="head-img">
      <h2>PACIENTES ACTUALES</h2>
      <button @click="logOut">LOG OUT</button>
    </div>
    <span v-show="isLoading" class="spinner-border spinner-border-sm"></span>
    <div class="" v-if="!isLoading">
      <table-lite
        class="table"
        :is-static-mode="true"
        :is-slot-mode="true"
        :columns="columns"
        :rows="tableRows"
        :total="totalRecordCount"
        :sortable="sortable"
      >
        <template v-slot:options="data">
         <!--  <transition name="fade">
            <div class="popup-modal" v-if="isVisible">
              <div class="window">
                <slot>Mas Info</slot>
              </div>
            </div>
          </transition> -->
                  Mas Info

          <!-- {{ data.value.options }}-index -->
        </template>
      </table-lite>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import TableLite from "vue3-table-lite";
export default {
  name: "HomeAll",
  components: { TableLite },
  data() {
    return {
      isVisible: false,
      content: [],
      isLoading: true,
      columns: [
        {
          label: "ID",
          field: "id",
          width: "2%",
          sortable: true,
          isKey: true,
        },
        {
          label: "Nombre",
          field: "name",
          width: "10%",
          sortable: true,
          isKey: false,
        },
        {
          label: "Email",
          field: "email",
          width: "10%",
          sortable: true,
          isKey: false,
        },
        {
          label: "Tel",
          field: "phone",
          width: "10%",
          sortable: true,
          isKey: false,
        },
        {
          label: "",
          field: "options",
          width: "10%",
          sortable: false,
          isKey: false,
        },
      ],
      totalRecordCount: 0,
      sortable: {
        order: "id",
        sort: "asc",
      },
    };
  },
  computed: {
    tableRows() {
      return this.content.map((row, index) => ({
        id: row.id,
        name: row.person.people_first_name,
        email: row.person.email,
        phone: row.person.people_mobile,
        options: index,
      }));
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    getAllPatients() {
      this.isLoading = true;
      UserService.getAllPatients()
        .then(
          (response) => {
            this.content = response.data;
            this.totalRecordCount = response.data.length;
          },
          (error) => {
            this.content =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          }
        )
        .finally(() => {
          this.isLoading = false;
        });
    },
    open() {
      this.isVisible = true;
    },
    close() {
      this.isVisible = false;
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
  mounted() {
    this.getAllPatients();
  },
};
</script>

<style scoped>
.dddd {
  background: #ffffff;
}
.table {
  border-radius: 50px;
}
.head-img {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
h2 {
  color: #5492fd;
  font-family: "Bebas Neue", cursive;
  left: 50px;
  font-size: 40px;
  line-height: 48px;
}
img {
  margin-left: 100px;
  margin-top: 20px;
}
button {
  background: #5492fd;
  border-radius: 50px;
  width: 20%;
  margin-bottom: 15px;
}
@media (max-width: 480px) {
  .head-img {
    flex-direction: column;
    align-items: center;
  }
  .table {
    width: 100%;
  }
  h2 {
    margin-bottom: 20px;
  }
  button {
    width: 80%;
    padding: 10px;
  }
}
</style>