import Header from "./Header";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import VenueDataService from "../services/VenueDataService";
import Modal from "./Modal";

export default function UpdateVenue() {
  const dispatch = useDispatch(); // Redux dispatch function for state management

  const navigate = useNavigate(); // Navigation function for redirection

  const [showModal, setShowModal] = React.useState(false); // State for modal visibility

  const { venueID } = useParams(); // Get venue ID from URL parameters

  // Number of days for open-close hours
  const [daysCounts, setDaysCounts] = React.useState(1);

  // Form state
  const [form, setForm] = React.useState({
    name: "",
    address: "",
    menu: "",
    coordinates: "",
    isClosed: "false",
    hours: [{ days: "", open: "", close: "" }],
  });

  React.useEffect(() => {
    VenueDataService.getVenueByID(venueID).then((res) => {
      const v = res.data;

      setForm({
        name: v.name,
        address: v.address,
        menu: v.menu.join(", "),
        coordinates: `${v.coordinates[1]},${v.coordinates[0]}`, // long,lat → lat,long
        isClosed: v.hours?.[0]?.isClosed ? "true" : "false",
        hours: v.hours || [{ days: "", open: "", close: "" }],
      });

      setDaysCounts(v.hours?.length || 1);
    });
  }, [venueID]);

  // Normalize menu input to array
  const menu =
    typeof form.menu === "string"
      ? form.menu.split(",").map((i) => i.trim())
      : form.menu;

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // Handle hours input changes
  const handleHourChange = (index, field, value) => {
    const updated = [...form.hours];
    updated[index][field] = value;
    setForm({ ...form, hours: updated });
  };

  // Update hours array when daysCounts changes
  React.useEffect(() => {
    setForm((prev) => ({
      ...prev,
      hours: Array.from(
        { length: daysCounts },
        (_, i) => prev.hours[i] || { days: "", open: "", close: "" }
      ),
    }));
  }, [daysCounts]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Reverse coordinates from "lat,long" to [long, lat] format for API
    const coordsInput = form.coordinates.split(",").map(Number);
    const coords = [coordsInput[1], coordsInput[0]];

    // Prepare hours array with isClosed field
    const hours = form.hours.map((h) => ({
      ...h,
      isClosed: form.isClosed === "true",
    }));

    // Prepare payload for API request
    const payload = {
      name: form.name,
      address: form.address,
      menu: JSON.stringify(menu),
      coordinates: JSON.stringify(coords),
      hours: JSON.stringify(hours),
    };

    // Dispatch action to indicate initiation of adding/updating venue
    VenueDataService.updateVenue(venueID, payload)
      .then(() => {
        dispatch({ type: "ADD_UPDATE_VENUE_SUCCESS" });
        setShowModal(true); // Show success modal
        navigate("/admin"); // Successfully return to admin panel
      })
      .catch(() => {
        dispatch({ type: "ADD_UPDATE_VENUE_FAILURE" });
      });
  };

  return (
    <>
      {/* Header Component */}
      <Header
        headerText="Admin Panel"
        slogan={
          <>
            Update{" "}
            <strong>
              <i>{form.name}</i>
            </strong>{" "}
            Venue ...
          </>
        }
      />

      <div className="col-xs-12 col-md-10">
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label className="col-xs-10 col-sm-3 control-label">Name :</label>
            <div className="col-xs-12 col-sm-9">
              <input
                className="form-control"
                id="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Address */}
          <div className="form-group">
            <label className="col-xs-10 col-sm-3 control-label">
              Address :
            </label>
            <div className="col-xs-12 col-sm-9">
              <input
                className="form-control"
                id="address"
                value={form.address}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Menu */}
          <div className="form-group">
            <label className="col-xs-10 col-sm-3 control-label">Menu :</label>
            <div className="col-xs-12 col-sm-9">
              <input
                className="form-control"
                id="menu"
                value={form.menu}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Coordinates */}
          <div className="form-group">
            <label className="col-xs-10 col-sm-3 control-label">
              Coordinates (lat,long) :
            </label>
            <div className="col-xs-12 col-sm-9">
              <input
                className="form-control"
                id="coordinates"
                value={form.coordinates}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Days Count */}
          <div className="form-group">
            <label className="col-xs-10 col-sm-3 control-label">
              Number of Open-Close Days :
            </label>
            <div className="col-xs-12 col-sm-3">
              <select
                className="form-control"
                value={daysCounts}
                onChange={(e) => setDaysCounts(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dynamically render Open-Close Days and Hours */}
          {form.hours.map((h, i) => (
            <div key={i}>
              <div className="form-group">
                <label className="col-xs-10 col-sm-3 control-label">
                  Open - Close Days #{i + 1} :
                </label>
                <div className="col-xs-12 col-sm-9">
                  <input
                    className="form-control"
                    value={h.days}
                    onChange={(e) =>
                      handleHourChange(i, "days", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Open-Close Hours */}
              <div className="form-group">
                <label className="col-xs-10 col-sm-3 control-label">
                  Open - Close Hours #{i + 1} :
                </label>
                <div className="col-sm-4">
                  <input
                    placeholder="Open"
                    className="form-control"
                    value={h.open}
                    onChange={(e) =>
                      handleHourChange(i, "open", e.target.value)
                    }
                  />
                </div>

                <div className="col-sm-4">
                  <input
                    placeholder="Close"
                    className="form-control"
                    value={h.close}
                    onChange={(e) =>
                      handleHourChange(i, "close", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Is Closed */}
          <div className="form-group">
            <label className="col-xs-10 col-sm-3 control-label">
              Is Venue Closed :
            </label>
            <div className="col-xs-12 col-sm-3">
              <select
                className="form-control"
                id="isClosed"
                value={form.isClosed}
                onChange={handleChange}
              >
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <span className="btn pull-right">
            <button
              className="btn btn-primary pull-right"
              name="updateVenue"
              type="submit"
            >
              Update Venue
            </button>
          </span>
        </form>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          dispatch({ type: "STATUS_RESET" });
          setShowModal(false);
        }}
        title="Success"
        message="Venue updated successfully!"
      />
    </>
  );
}
