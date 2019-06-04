<template>
  <div>
    <header>
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <img src="@/static/vue-logo-grn.png" @click="clearPins()" class="logo" alt="">
            <input class="col-lg-12" type="text" v-on:keyup.enter="addNewPinWithFirebase()" v-model="currURL" placeholder="Paste a URL to add a new Pin...">
          </div>
          <div class="col-md-4 vertical-center items-right">
            <div v-if="currUser" class="fake-link">
              <img :src="userPhoto" class="avatar-sml">
              <span @click="filterPinsBy('currUser')" class="btn-addpin">
                {{ currUser }}
              </span> 
              <!-- <span @click="signInWithGoogle()" class="btn-addpin">Login</span> -->
              <span @click="logoutWithFirebase()" class="btn-addpin">Logout</span>
            </div>
            <div v-else class="fake-link"><span class="fake-link btn-addpin" @click="signInWithGoogle()">Login with Google</span></div>
          </div>
        </div>
      </div>
    </header>
    <section class="body">
      <!-- {{ allPins }} -->
      <PinList :allPins="allPins" :pinOptions="pinOptions"></PinList>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import PinList from '~/components/PinList/PinList'
import Footer from '~/components/Footer'
import Firebase from 'firebase'
import firebase from '../firebase-config.js'
import mixins from '../mixins'
import { mapGetters } from 'vuex'

export default {
  components: {
    PinList,
    Footer
  },
  created() {
    // document.title = `Vue-Pinterest (${this.allPins.length})`

    this.checkIfLoggedInWithFirebase()
    this.getAllPinsWithFirebase()
  },
  computed: {
    myPins: function () {
      return this.allPins.filter((pin) => {
        return pin.pinner === this.currUser
      })
    },
    ...mapGetters([
      'currUser',
      'allPins'
    ])
  },
  data: function () {
    return {
      pinOptions: ['pin'],
      visibilePins: [],
      currURL: '',
      userPhoto: 'https://images.unsplash.com/photo-1548350218-1e7893660a72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      userPins: []
    }
  },
  methods: {
    alert(msg) {
      alert(msg)
    },
    filterPinsBy(type) {
      let pins 

      if (type === 'currUser') {
        pins = this.allPins.filter((item) => {
          return item.pinners.includes(this.currUser)
        })

        this.pinOptions = ['delete']
      } 
      
      this.visibilePins = pins
    },
    addNewPin() {
      this.$store.commit('createNewPin',
      {
        pinID: "127",
        pinURL: this.currURL,
        pinnedBy: (this.currUser !== '') ? this.currUser : 'Anonymous',
        pinners: (this.currUser !== '') ? this.currUser : 'Anonymous'
      })
    },
    clearPins() {
      this.pinOptions = ['pin']
      this.visibilePins = this.allPins
    },
    checkIfLoggedInWithFirebase: function () {
      let self = this
      firebase.firebaseApp.auth().onAuthStateChanged(function(user) {
        if (user) {
          self.$store.commit('setCurrUser', user.displayName.split(' ')[0])
          self.userPhoto = user.photoURL
        } else {
          self.logoutWithFirebase()
        }
      })
    },
    getAllPinsWithFirebase: function () {
      let self = this
      let allPinsByFirebase = []

      firebase.firestore.collection('allPins').orderBy('timestamp', 'desc').get()
      .then(function(querySnapshot) {
          // console.log(querySnapshot)
          querySnapshot.forEach(function(doc) {
            allPinsByFirebase.push(doc.data())
              // doc.data() is never undefined for query doc snapshots
              // console.log(doc.id, " => ", doc.data());
          });
      })
      .then(function () {
        console.log(allPinsByFirebase)
        self.$store.commit('updateAllPins', allPinsByFirebase) 
        // self.visibilePins = allPinsByFirebase
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
    },
    addNewPinWithFirebase: function () {
      let self = this

      if (this.currURL === '') {
        alert('Cannot add new pin');
      } else {
        let self = this
        let currUser = (self.currUser !== '') ? this.currUser : 'Anonymous'

        firebase.firestore.collection('allPins').add({
          pinURL: self.currURL,
          pinnedBy: currUser,
          pinners: [currUser],
          timestamp: Date.now()
        }).then(function() {
          self.getAllPinsWithFirebase()
        })
        // }

        // img.src = currURL;
      }
    },
    signInWithGoogle: function () {
      let self = this

      var provider = new Firebase.auth.GoogleAuthProvider();
      firebase.firebaseApp.auth().signInWithPopup(provider).then(function (result) {
          var token = result.credential.accessToken;
          var data = result.user;

          self.$store.commit('setCurrUser', data.displayName.split(' ')[0])
          self.userPhoto = data.photoURL
          console.log(self.currUser)
          console.log(data)

          // alert('Google success')
      }).catch(function (error) {
          console.log(error)
      });
    },
    logoutWithFirebase: function () {
      firebase.firebaseApp.auth().signOut();
      this.$store.commit('setCurrUser', '')
    }, 
  }
}
</script>

<style scoped>
.body {
  padding-top: 66px;
}

.avatar-sml {
  height: 30px;
  width: 30px;
  display: inline-block;
  border-radius: 100px;
  background-color: grey;
  margin-top: -15px;
  margin-right: 10px;
  background-size: cover;
}

input[type='text'] {
  margin-top: 0px;
  padding: 8px 12px;
  border: 0px;
  width: 90%;
  background-color: #EEE;
  border-radius: 14px;
  font-weight: 700;
  margin-top: 0px;
}

.items-right {
  justify-content: flex-end;
}

.vertical-center {
  display: flex;
  align-items: center;
}

.logo {
  width: 30px;
  margin-right: 10px;
  margin-top: -5px;
}

.logo:hover {
  cursor: pointer;
}

.container {
  background-color: #FFF;
  margin: 4px auto 6px auto;
}

.btn-addpin {
  margin: 0px 2px;
  display: inline-block;
  padding: 5px 12px;
  border-radius: 20px;
  color: grey;
  cursor: pointer;
  font-weight: 700;
  vertical-align: text-bottom;
}

.btn-addpin_left {
  margin-left: 6px;
}

.btn-addpin:hover {
  background-color: #EEE;
}

.avatar {
  width: 30px;
  height: 30px;
  display: inline-block;
  background-color: #111;
  border-radius: 100%;
}

.vertical-center {
  margin-top: auto;
  margin-bottom: auto;
}
</style>