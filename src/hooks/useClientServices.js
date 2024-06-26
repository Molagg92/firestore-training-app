import { useState, useEffect } from "react";
import { db } from '../config/firestore';
import { collection, getDocs, query, where } from "firebase/firestore";

const useClientServices = (clientId) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const enrollmentCollectionRef = collection(db, 'JoinEnroll');
        const servicesCollectionRef = collection(db, 'Service');

        const enrollmentQuery = query(enrollmentCollectionRef, where('clientId', '==', clientId));
        const enrollmentSnapshot = await getDocs(enrollmentQuery);
        const enrollmentDocs = enrollmentSnapshot.docs.map(doc => doc.data());

        const serviceIds = enrollmentDocs.map(enrollment => enrollment.serviceId);

        if (serviceIds.length === 0) {
          setServices([]);
          return;
        }
        

        const servicesQuery = query(servicesCollectionRef, where('__name__', 'in', serviceIds));
        const servicesSnapshot = await getDocs(servicesQuery);
        const serviceData = servicesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        setServices(serviceData);
      } catch (err) {
        console.error("Error fetching Client Services Brother, : ", err);
      }
    };

    fetchServices();
  }, [clientId]);
  
  return services;
};

export default useClientServices;