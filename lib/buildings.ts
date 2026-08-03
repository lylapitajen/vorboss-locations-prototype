export type Contact = {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  company: string;
  role: string;
};

export type Note = {
  date: string;
  user: string;
  content: string;
};

export type CompanyStatus = "Active" | "Prospect";

export type Company = {
  name: string;
  companyNumber: string;
  address: string;
  status: CompanyStatus;
};

export type Visit = {
  date: string;
  user: string;
};

export type Building = {
  name: string;
  connected: boolean;
  wayleaveAgreed: boolean;
  residential: boolean;
  contacts: Contact[];
  notes: Note[];
  companies: Company[];
  visits: Visit[];
};

export const BROADGATE_TOWER: Building = {
  name: "Broadgate Tower",
  connected: true,
  wayleaveAgreed: true,
  residential: false,
  companies: [
    {
      name: "Rand Merchant Bank",
      companyNumber: "08423991",
      address: "20 Primrose Street, London, EC2A 2EW",
      status: "Active",
    },
    {
      name: "CIECO Energy Service (UK) Ltd",
      companyNumber: "07215546",
      address: "20 Primrose Street, London, EC2A 2EW",
      status: "Prospect",
    },
  ],
  contacts: [
    {
      firstName: "Sarah",
      lastName: "Whitfield",
      email: "sarah.whitfield@randmerchantbank.com",
      contactNumber: "+44 20 7946 0192",
      company: "Rand Merchant Bank",
      role: "Office Manager",
    },
    {
      firstName: "Daniel",
      lastName: "Okafor",
      email: "daniel.okafor@ciecoenergy.co.uk",
      contactNumber: "+44 20 7946 0783",
      company: "CIECO Energy Service (UK) Ltd",
      role: "Facilities Lead",
    },
  ],
  notes: [
    {
      date: "2026-07-15",
      user: "Aiden Clarke",
      content: "Building management confirmed fibre riser access on floors 2-6. Ground floor comms room still needs a site survey.",
    },
    {
      date: "2026-06-02",
      user: "Priya Anand",
      content: "Spoke to Rand Merchant Bank's office manager - they're open to a call about upgrading their current connectivity contract.",
    },
  ],
  visits: [
    {
      date: "2026-07-06",
      user: "Aiden Clarke",
    },
    {
      date: "2026-05-21",
      user: "Priya Anand",
    },
  ],
};
