export interface Education {
    institution: string;
    degree: string;
    specialization: string;
    graduatedYear: number;
    description: string;
    website: string;
}

export const educationDataMock: Education[] = [
    {
        institution: "Belarusian State University of Informatics and Radioelectronics (BSUIR)",
        degree: "Bachelor's in Computer Science",
        specialization: "Software Engineering",
        graduatedYear: 2016,
        description: "One of the leading technical universities in Belarus, BSUIR specializes in IT, electronics, and telecommunications. It plays a crucial role in preparing specialists for the high-tech industry.",
        website: "https://www.bsuir.by/en"
    },
    {
        institution: "Belarusian National Technical University (BNTU)",
        degree: "Bachelor's and Master's in Engineering",
        specialization: "Hydraulic Engineering and Scientific Research",
        graduatedYear: 2014,
        description: "BNTU is a major technical university in Belarus offering a wide range of engineering disciplines. It is known for its applied research and collaboration with industrial partners.",
        website: "https://bntu.by"
    },
    {
        institution: "Belarusian National Technical University (BNTU)",
        degree: "Bachelor's in Logistics",
        specialization: "Logistics and Supply Chain Management",
        graduatedYear: 2013,
        description: "The BNTU Faculty of Management Technologies provides training in logistics, combining engineering and business perspectives to prepare graduates for roles in transportation, warehousing, and operations.",
        website: "https://bntu.by"
    },
    {
        institution: "Belarusian National Technical University (BNTU)",
        degree: "Master's in Mechanical Engineering",
        specialization: "Machine Building and Engineering Research",
        graduatedYear: 2015,
        description: "This master's program at BNTU focuses on advanced mechanical systems, design methodologies, and scientific approaches in machine engineering and manufacturing technologies.",
        website: "https://bntu.by"
    }
];