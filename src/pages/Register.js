// import React, { useState } from "react";
// import Add from "../img/addAvatar.png";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth, db, storage } from "../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const [err, setErr] = useState(false);
//   const navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // console.log(e.target[0].value);
//     // console.log(e.target[0].name);
//     const displayName = e.target[0].value;
//     const email = e.target[1].value;
//     const password = e.target[2].value;
//     const file = e.target[3].files[0]; //means take 1st image


//     try {
//       const response = await createUserWithEmailAndPassword(auth, email, password);

//       // console.log(response.user);

//       // to store image --https://firebase.google.com/docs/storage/web/upload-files
//       const storageRef = ref(storage, displayName); //means if dname is john then image name will be john.png/jpg

//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         (error) => {
//           setErr(true);
//         },
//         () => {
//           // Handle successful uploads on complete
//           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//             console.log('File available at', downloadURL);
//             // update user profile
//             await updateProfile(response.user, {
//               displayName: displayName,
//               photoURL: downloadURL
//             });

//             // db , collection name,unique key
//             await setDoc(doc(db, "users", response.user.uid), {
//               uid: response.user.uid,
//               displayName,
//               email,
//               photoURL:downloadURL
//             });

//             await setDoc(doc(db,"userChats",response.user.uid),{}); //bec initially there are no chats
//             navigate('/');

//           });
//         }
//       );
//     } catch (error) {
//       setErr(true);
//     }
//   }

//   return (
//     <div className="formContainer">
//       <div className="formWrapper">
//         <span className="logo">Lama Chat</span>
//         <span className="title">Register</span>
//         <form onSubmit={handleSubmit}>
//           <input required type="text" placeholder="display name" name='name' />
//           <input required type="email" placeholder="email" name='email' />
//           <input required type="password" placeholder="password" name='password' />
//           <input style={{ display: "none" }} type="file" id="file" name='file' />
//           <label htmlFor="file">
//             <img src={Add} alt="" />
//             <span>Add an avatar</span>
//           </label>
//           <button >Sign up</button>
//           {err && <span> Something went wrong</span>}
//         </form>
//         <p>
//           You do have an account? Login
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Register;




import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0]; // to get 1st uploaded image

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // console.log(res.user)

      //Create a unique image name
      // to store image --https://firebase.google.com/docs/storage/web/upload-files
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/register">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;