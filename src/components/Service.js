import React, { useEffect, useState } from "react";
import { db } from '../config/firestore';
import { getDocs, collection, addDoc } from 'firebase/firestore';

function Service() {
  const [serviceList, setServiceList] = useState([]);
  const [newServiceDateTime, setNewServiceDateTime] = useState("");
  const [isDeepCleaning, setIsDeepCleaning ] = useState(true);

  const serviceCollectionRef = collection(db, "Service");

  const getServiceList = async () => {
    try {
      const data = await getDocs(serviceCollectionRef);
      const specificData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setServiceList(specificData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getServiceList();
  }, []);

  const onSubmitService = async () => {
    try {
      await addDoc(serviceCollectionRef, {
        dateTime: newServiceDateTime,
        deepCleaning: isDeepCleaning,
      });
      getServiceList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {serviceList.map((Service) => (
        <div key={Service.id}>
          <h1 style={{ color: Service.deepCleaning ? "green" : "red" }}>{Service.dateTime}</h1>
          <h1>{Service.deepCleaning}</h1>
        </div>
      ))}

      <div>
        <input
          placeholder="Service Day and Time?"
          onChange={(e) => setNewServiceDateTime(e.target.value)}
        />
        <input
          type="checkbox"
          checked={isDeepCleaning}
          onChange={(e) => setIsDeepCleaning(e.target.checked)}
        />
        <label>Deep Cleaning</label>
        <button onClick={onSubmitService}> Submit Service </button>
      </div>
    </div>
  );
}

export default Service;