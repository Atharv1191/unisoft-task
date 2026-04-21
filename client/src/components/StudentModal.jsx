import React, { useEffect, useState } from "react";

const StudentModal = ({ show, onClose, onSubmit, editData }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        parent_id: "",
    });

    // ─── Agar Edit hai toh form prefill karo ─────────────────
    useEffect(() => {
        if (editData) {
            setFormData({
                name: editData.name || "",
                email: editData.email || "",
                age: editData.age || "",
                parent_id: editData.parent_id || "",
            });
        } else {
            setFormData({ name: "", email: "", age: "", parent_id: "" });
        }
    }, [editData, show]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* ─── Header ─── */}
                    <div className="modal-header bg-dark text-white">
                        <h5 className="modal-title">
                            {editData ? "✏️ Edit Student" : "➕ Add New Student"}
                        </h5>
                        <button className="btn-close btn-close-white" onClick={onClose} />
                    </div>

                    {/* ─── Body ─── */}
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Name *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter student name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Email *</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter student email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Age *</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="age"
                                    placeholder="Enter age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Parent ID</label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    className="form-control"
                                    name="parent_id"
                                    placeholder="Enter parent ID (optional)"
                                    value={formData.parent_id ?? ""}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* ─── Footer Buttons ─── */}
                            <div className="d-flex justify-content-end gap-2 mt-4">
                                <button type="button" className="btn btn-secondary" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-dark">
                                    {editData ? "Update Student" : "Add Student"}
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StudentModal;