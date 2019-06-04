import Firebase from 'firebase'
import firebase from '../firebase-config.js'
import { mapState, mapMutations } from 'vuex'

// mostly firebase controls
export default {
  computed: {
    ...mapMutations({
      loginUser: 'loginUser',
      logoutUser: 'logoutUser',
      updateUser: 'updateUser'
    })
  },
  methods: {
    hello: function () {
      // alert(loginUser)
      alert('hello from mixin!')
    },
    signInWithGoogle: function () {
      let self = this
      var provider = new Firebase.auth.GoogleAuthProvider();
      firebase.firebaseApp.auth().signInWithPopup(provider).then(function (result) {
          var token = result.credential.accessToken;
          var data = result.user;

          self.loginUser()
          self.updateUser(data)
          console.log(data)

          alert('Google success')
      }).catch(function (error) {
          console.log(error)
      });
    },
    logoutWithFirebase: function () {
      alert("Successfully logged out.")
      firebase.firebaseApp.auth().signOut();
      this.logoutUser
      // this.userData = '';
      // this.status = false;
    }, 
    getCurrUser: function () {
      if (this.status && this.userData.displayName) {
        return this.userData.displayName
      } else {
        return 'Anonymous'
      }
    },
    addImage: function (currURL) {
      if (currURL === '') {
        alert('That is not a valid URL.');
      } else {
        let self = this
        var img = new Image();

        img.onload = function() {
          firebase.firestore.collection('imgURLs').add({
            url: currURL,
            uploadedBy: 'User',
            userIP: '1.0.0.0.1',
            kudos: 0,
            reports: 0,
            zoomData: {
              currZoom: 100,
              currYPos: 0,
              currXPos: 0,
            },
            comments: [
              {
                comment: 'Wow, this composition!',
                author: 'Anonymous'
              }
            ],
            imgWidth: img.width,
            imgHeight: img.height,
            timestamp: Date.now()
          })    
        }

        img.src = currURL;
      }
    },
    addPin: function (imgKey) {
      // delete pin from firebase db
      alert('Add Pin to user pins')
      // firebase.firestore.collection('imgURLs').doc(imgKey).delete();
    },
    deletePin: function(imgKey) {
      // delete pin from firebase db
      firebase.firestore.collection('imgURLs').doc(imgKey).delete();
    }
  }
}