export interface Education {
    institution: string;
    degree: string;
    specialization: string;
    graduatedYear: number;
}

export const educationDataMock: Education[] = [
    {
        institution: "Belarusian State University of Informatics and Radioelectronics",
        degree: "Bachelor's in Computer Science",
        specialization: "Software Engineering",
        graduatedYear: 2016,
    },
    {
        institution: "Belarusian National Technical University",
        degree: "Bachelor's and Master's in Engineering",
        specialization: "Hydraulic Engineering and Scientific Research",
        graduatedYear: 2014,
    },
];