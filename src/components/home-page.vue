<template>
  <img src="../assets/Frame.svg" />
  <div class="container jumbotron dddd">
    <div class="head-img">
      <h2>PACIENTES ACTUALES</h2>
      <button @click="logOut">LOG OUT</button>

      <vue-final-modal v-model="show" name="example">
        <template v-slot="{ params }">
          <div class="div-dialog" v-if="dataRow != null">
            <div class="pop-header">
              <div class="pop-paciente">
                <div class="avatar"></div>

                <div class="pop-nombre">
                  {{ dataRow.person.people_first_name }}
                  <span> Paciente Actual </span>
                </div>
              </div>

              <div class="pop-dni">
                C.I {{ dataRow.person.people_document }}
              </div>

              <div class="pop-email">
                {{ dataRow.person.email }}
              </div>
              <div class="close-btn" @click="show = false">
                <vue-feather type="x"></vue-feather>
              </div>
            </div>

            <div class="pop-content">
              <div class="pop-edad content-item">
                {{ dataRow.person.age }}
                <span>Edad</span>
              </div>
              <div class="pop-genero content-item">
                {{ dataRow.person.people_sex }}
                <span>Sexo</span>
              </div>
              <div class="pop-address content-item">
                {{ dataRow.person.people_address }}
                <span>Dirección</span>
              </div>
              <div class="pop-phone content-item">
                {{ dataRow.person.people_phone }}
                <span>Phone</span>
              </div>
              <div class="pop-mobile content-item">
                {{ dataRow.person.people_mobile }}
                <span>Mobile</span>
              </div>
            </div>

            <div class="pop-footer">
              <button class="btn button btn-primary btn-block">
                VER FICHA MÉDICA
              </button>
            </div>
          </div>
          {{ params.userName }}
        </template>
      </vue-final-modal>
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
          <div @click="PopUp(data.value.options)">
            <vue-feather
              class="more-horizontal"
              type="more-horizontal"
            ></vue-feather>
          </div>
        </template>
      </table-lite>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import TableLite from "vue3-table-lite";
import { VueFinalModal } from "vue-final-modal";

export default {
  name: "HomeAll",
  components: { TableLite, VueFinalModal },
  data() {
    return {
      dataRow: null,
      show: false,
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
    PopUp(index) {
      this.show = true;
      this.dataRow = this.content[index];
      this.dataRow.person.people_sex =
        this.dataRow.person.people_sex == "F" ? "Femenino" : "Masculino";
      this.dataRow.person.age =
        new Date(Date.now()).getUTCFullYear() -
        new Date(
          Date.parse(this.dataRow.person.people_birthday)
        ).getUTCFullYear();
    },
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
.div-dialog {
  margin: 0;
  color: black;
  background-color: white;
  position: absolute;
  left: 10%;
  width: 80%;
  top: 25vh;
  max-height: 80%;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
}
.div-dialog span {
  color: #5492fd;
  font-size: 14px;
  font-style: normal;
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
.div-dialog {
  padding: 30px 40px;
  font-family: "Montserrat";
  color: #3d465b;
  font-weight: bold;
}
.pop-header,
.pop-paciente,
.pop-content {
  display: flex;
  flex-direction: row;
}
.pop-header,
.pop-content {
  justify-content: space-between;
}
.pop-header {
  margin-bottom: 25px;
}
.pop-nombre {
  display: flex;
  flex-direction: column;
}
.content-item {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  word-wrap: no-wrap;
}
.content-item:not(:last-child) {
  border-right: 1px solid black;
}
.pop-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
}
.close-btn {
  color: #5577ff;
  cursor: pointer;
}
.avatar {
  background: #c4c4c4;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 20px;
}
.more-horizontal {
  color: #5577ff;
  font-size: 70px;
  width: 35px;
  display: block;
  margin: 0 auto;
}

</style>