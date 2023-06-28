import React, { useState, useEffect, useContext } from "react";
import { useFetch as uselocation } from "./api/location";
import { UserContext } from "./UserContext";

export const Userloc = () => {
  const { user } = useContext(UserContext);
  const { sendRequest: sendlocation } = uselocation();
  const [usr_loc, setUsr_loc] = useState({
    region: "",
    province: "",
    city: "",
    district: "",
    barangay: "",
  });

  const loc = async () => {
    const result = await sendlocation(
      `/user/record/${user.barangay}/${user.district}/${user.city}/${user.province}/${user.region}/`,
      "GET"
    );
    if (result && result.error) throw result.error;

    setUsr_loc({
      ...usr_loc,
      region: result.region,
      province: result.province,
      city: result.city,
      district: result.district,
      barangay: result.barangay,
    });
  };

  useEffect(() => {
    loc();
  }, []);

  return (
    <div className="d-flex">
      {usr_loc && (
        <div className="m-1 mt-3 d-flex text-muted">
          <h5>
            {usr_loc.region},{usr_loc.province},{usr_loc.city},
            {usr_loc.district},{usr_loc.barangay}
          </h5>
        </div>
      )}
    </div>
  );
};
