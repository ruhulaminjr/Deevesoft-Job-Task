import React from "react";
import Navbar from "../Navbar/Navbar";
import { collection, addDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { register, handleSubmit } = useForm();
  const { user, db, Logout } = useAuth();
  const onSubmit = async (data) => {
    const userData = {
      goal: data.submitData,
      email: user.email,
      name: user.displayName || "User Name",
    };
    try {
      const docRef = await addDoc(collection(db, "UserData"), userData);
      alert("user Data Submited Succesfully Id is", docRef.id);
    } catch (e) {
      alert("Error adding document: ", e);
      console.log(e);
    }
    console.log(userData);
  };
  return (
    <div className="center2">
      {/* <button onClick={Logout}>Logout</button> */}
      <Navbar />
      <div className="container">
        <div className="goal">
          <h1>Goal</h1>
          <p>
            Select Your Primary Goal. What do you want to <br /> accomplish in
            the next few month ?
          </p>
        </div>
        <div className="select">
          <form onSubmit={handleSubmit(onSubmit)} className="select-form">
            <div className="select-item">
              <input
                type="radio"
                value="Get leaner"
                {...register("submitData", { required: true })}
              />
              <label>Get Leaner</label>
            </div>
            <div className="select-item">
              <input
                type="radio"
                value="Get Active Again"
                {...register("submitData", { required: true })}
              />
              <label>Get Active Again</label>
            </div>
            <div className="select-item">
              <input
                type="radio"
                value="Reduce Pain or injury"
                {...register("submitData", { required: true })}
              />
              <label>Reduce Pain or Injury</label>
            </div>
            <div className="select-item">
              <input
                type="radio"
                value="Improve cardio or speed"
                {...register("submitData", { required: true })}
              />
              <label>Improve cardio or speed</label>
            </div>
            <div className="select-item">
              <input
                type="radio"
                value="Reduce Pain or injury"
                {...register("submitData", { required: true })}
              />
              <label>Reduce Pain or Injury</label>
            </div>
            <div className="select-item">
              <input
                type="radio"
                value="Improve sports performance"
                {...register("submitData", { required: true })}
              />
              <label>Imporove sports performance</label>
            </div>
            <div>
              <button className="submit-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
