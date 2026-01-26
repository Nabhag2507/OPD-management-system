// Mock CRUD Service with in-memory storage

// Initialize mock data
let mockData = {
  hospitals: [
    { id: 1, name: "City Hospital", location: "Downtown", beds: 150 },
    { id: 2, name: "Central Medical", location: "Midtown", beds: 200 },
    { id: 3, name: "Emergency Care", location: "Uptown", beds: 100 }
  ],
  doctors: [
    { id: 1, name: "Dr. Sharma", specialization: "Cardiology", hospital_id: 1, experience: 10 },
    { id: 2, name: "Dr. Patel", specialization: "Neurology", hospital_id: 2, experience: 8 },
    { id: 3, name: "Dr. Kumar", specialization: "Orthopedics", hospital_id: 1, experience: 12 }
  ],
  treatmentTypes: [
    { id: 1, name: "General Check-up", cost: 500 },
    { id: 2, name: "Consultation", cost: 800 },
    { id: 3, name: "Surgery", cost: 15000 }
  ],
  subTreatmentTypes: [
    { id: 1, treatment_type_id: 1, name: "Blood Pressure Check", cost: 100 },
    { id: 2, treatment_type_id: 2, name: "X-Ray", cost: 1000 }
  ],
  diagnosisTypes: [
    { id: 1, name: "Hypertension", code: "HTN" },
    { id: 2, name: "Diabetes", code: "DM" },
    { id: 3, name: "Asthma", code: "ASM" }
  ],
  patients: [
    { id: 1, name: "Patient A", email: "patientA@email.com", phone: "9876543210", age: 45 },
    { id: 2, name: "Patient B", email: "patientB@email.com", phone: "9876543211", age: 35 }
  ],
  opds: [
    { id: 1, patient_id: 1, doctor_id: 1, diagnosis_id: 1, date: "2025-01-20" },
    { id: 2, patient_id: 2, doctor_id: 2, diagnosis_id: 2, date: "2025-01-21" }
  ],
  receipts: [
    { id: 1, patient_id: 1, amount: 1500, date: "2025-01-20", status: "Paid" },
    { id: 2, patient_id: 2, amount: 2000, date: "2025-01-21", status: "Paid" }
  ]
};

export const crudService = {
  // Generic GET all
  getAll: async (entity) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: mockData[entity] || [],
          message: `Fetched all ${entity}`
        });
      }, 300);
    });
  },

  // Generic GET by ID
  getById: async (entity, id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item = mockData[entity]?.find(item => item.id == id);
        resolve({
          success: !!item,
          data: item,
          message: item ? `Fetched ${entity} with id ${id}` : "Not found"
        });
      }, 300);
    });
  },

  // Generic CREATE
  create: async (entity, payload) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItem = {
          id: Math.max(...mockData[entity].map(i => i.id), 0) + 1,
          ...payload
        };
        mockData[entity].push(newItem);
        resolve({
          success: true,
          data: newItem,
          message: `${entity.slice(0, -1)} created successfully`
        });
      }, 300);
    });
  },

  // Generic UPDATE
  update: async (entity, id, payload) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockData[entity].findIndex(item => item.id == id);
        if (index !== -1) {
          mockData[entity][index] = { ...mockData[entity][index], ...payload };
          resolve({
            success: true,
            data: mockData[entity][index],
            message: `${entity.slice(0, -1)} updated successfully`
          });
        } else {
          resolve({
            success: false,
            message: "Record not found"
          });
        }
      }, 300);
    });
  },

  // Generic DELETE
  delete: async (entity, id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockData[entity].findIndex(item => item.id == id);
        if (index !== -1) {
          mockData[entity].splice(index, 1);
          resolve({
            success: true,
            message: `${entity.slice(0, -1)} deleted successfully`
          });
        } else {
          resolve({
            success: false,
            message: "Record not found"
          });
        }
      }, 300);
    });
  },

  // Specific entities with proper names
  hospitals: {
    getAll: () => crudService.getAll("hospitals"),
    create: (payload) => crudService.create("hospitals", payload),
    update: (id, payload) => crudService.update("hospitals", id, payload),
    delete: (id) => crudService.delete("hospitals", id)
  },

  doctors: {
    getAll: () => crudService.getAll("doctors"),
    create: (payload) => crudService.create("doctors", payload),
    update: (id, payload) => crudService.update("doctors", id, payload),
    delete: (id) => crudService.delete("doctors", id)
  },

  treatmentTypes: {
    getAll: () => crudService.getAll("treatmentTypes"),
    create: (payload) => crudService.create("treatmentTypes", payload),
    update: (id, payload) => crudService.update("treatmentTypes", id, payload),
    delete: (id) => crudService.delete("treatmentTypes", id)
  },

  subTreatmentTypes: {
    getAll: () => crudService.getAll("subTreatmentTypes"),
    create: (payload) => crudService.create("subTreatmentTypes", payload),
    update: (id, payload) => crudService.update("subTreatmentTypes", id, payload),
    delete: (id) => crudService.delete("subTreatmentTypes", id)
  },

  diagnosisTypes: {
    getAll: () => crudService.getAll("diagnosisTypes"),
    create: (payload) => crudService.create("diagnosisTypes", payload),
    update: (id, payload) => crudService.update("diagnosisTypes", id, payload),
    delete: (id) => crudService.delete("diagnosisTypes", id)
  },

  patients: {
    getAll: () => crudService.getAll("patients"),
    create: (payload) => crudService.create("patients", payload),
    update: (id, payload) => crudService.update("patients", id, payload),
    delete: (id) => crudService.delete("patients", id)
  },

  opds: {
    getAll: () => crudService.getAll("opds"),
    create: (payload) => crudService.create("opds", payload),
    update: (id, payload) => crudService.update("opds", id, payload),
    delete: (id) => crudService.delete("opds", id)
  },

  receipts: {
    getAll: () => crudService.getAll("receipts"),
    create: (payload) => crudService.create("receipts", payload),
    update: (id, payload) => crudService.update("receipts", id, payload),
    delete: (id) => crudService.delete("receipts", id)
  }
};

export default crudService;
