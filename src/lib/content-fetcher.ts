
export interface ContentItem {
  ref: string;
  content: string;
}

export interface HomeContent {
  welcomeText: string;
  aboutUsText: string;
  aboutUsPreviewImageUrl: string;
  ourTeamText: string;
  ourTeamPreviewImageUrl: string;
  activitiesText: string;
  activitiesPreviewImageUrl: string;
  roboconText: string;
  roboconPreviewImageUrl: string;
  instagramLink: string;
  facebookLink: string;
  linkedInLink: string;
}

export interface AboutContent {
  heroImageUrl: string;
  ourFounderText: string;
  ourFounderImageUrl: string;
  ourMissionText: string;
  ourVisionText: string;
  handsOnExperienceText: string;
  teamCollaborationText: string;
  careerOpportunitiesText: string;
}

export interface OrganizationContent {
  heroImageUrl: string;
}

export interface OrganizationMember {
  "img-url": string;
  name: string;
  position: string;
  description: string;
  "ig-link": string;
  "ws-link": string;
  "linkedin-link": string;
}

export interface OrganizationPastDirector {
  "img-url": string;
  name: string;
  year: string;
  description: string;
  "linkedin-link": string;
}

export interface ActivitiesContent {
  heroImageUrl: string;
}

export interface UpcomingActivity {
  "Image Url": string;
  "Activity Date": string;
  "Activity Description": string;
  "Activity Link": string;
}

export interface PastActivity {
  name: string;
  date: string;
  description: string;
}

export interface Achievement {
  name: string;
  date: string;
  description: string;
}

export interface RoboconContent {
  heroImageUrl: string;
  whatIsRoboconText: string;
  howWePrepareText: string;
  howWePrepareImageUrl: string;
  mechanicalTeamText: string;
  mechanicalTeamImageUrl: string;
  electricalTeamText: string;
  electricalTeamImageUrl: string;
  programmingTeamText: string;
  programmingTeamImageUrl: string;
}

export interface RoboconAchievement {
  name: string;
  date: string;
  "image-url": string;
}

export async function fetchHomeContent(): Promise<HomeContent> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_CONTENT_API_URL + "/home");

    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.statusText}`);
    }

    const data: ContentItem[] = await response.json();

    // Map the content items to a structured object
    const contentMap = data.reduce((acc, item) => {
      acc[item.ref] = item.content;
      return acc;
    }, {} as Record<string, string>);

    return {
      welcomeText: contentMap["Welcome Text"] || "Welcome to REC",
      aboutUsText: contentMap["About Us Text"] || "Our mission is to create a dynamic and inclusive environment where students can explore their passion for robotics.",
      aboutUsPreviewImageUrl: contentMap["About Us Preview Image Url"] || "",
      ourTeamText: contentMap["Our Team Text"] || "Meet the talented and dedicated individuals who form the backbone of our club.",
      ourTeamPreviewImageUrl: contentMap["Our Team Preview Image Url"] || "",
      activitiesText: contentMap["Activities Text"] || "From workshops and guest lectures to fierce competitions, there's always something happening at REC Robotics.",
      activitiesPreviewImageUrl: contentMap["Activities Preview Image Url"] || "",
      roboconText: contentMap["Robocon Text"] || "We are passionate competitors in the annual ABU Robocon.",
      roboconPreviewImageUrl: contentMap["Robocon Preview Image Url"] || "",
      instagramLink: contentMap["Instagram Link"] || "#",
      facebookLink: contentMap["Facebook Link"] || "#",
      linkedInLink: contentMap["LinkedIn Link"] || "#",
    };
  } catch (error) {
    console.error("Error fetching home content:", error);
    // Return default values if fetch fails
    return {
      welcomeText: "Welcome to REC",
      aboutUsText: "Our mission is to create a dynamic and inclusive environment where students can explore their passion for robotics, develop technical and leadership skills, and collaborate on innovative projects that solve real-world problems.",
      aboutUsPreviewImageUrl: "",
      ourTeamText: "Meet the talented and dedicated individuals who form the backbone of our club. Our team is a diverse group of students passionate about pushing the boundaries of robotics and innovation.",
      ourTeamPreviewImageUrl: "",
      activitiesText: "From workshops and guest lectures to fierce competitions, there's always something happening at REC Robotics. Check out our past events and see what we have planned for the future.",
      activitiesPreviewImageUrl: "",
      roboconText: "We are passionate competitors in the annual ABU Robocon. Explore our journey, our strategies, and our achievements in this prestigious Asia-Pacific robotics competition.",
      roboconPreviewImageUrl: "",
      instagramLink: "#",
      facebookLink: "#",
      linkedInLink: "#",
    };
  }
}

export async function fetchAboutContent(): Promise<AboutContent> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_CONTENT_API_URL + "/about-us");

    if (!response.ok) {
      throw new Error(`Failed to fetch about content: ${response.statusText}`);
    }

    const data: ContentItem[] = await response.json();

    // Map the content items to a structured object
    const contentMap = data.reduce((acc, item) => {
      acc[item.ref] = item.content;
      return acc;
    }, {} as Record<string, string>);

    return {
      heroImageUrl: contentMap["Hero Image Url"] || "",
      ourFounderText: contentMap["Our Founder Text"] || "Founded by a visionary with a passion for robotics, our club started as a small group of enthusiasts and has grown into a thriving community of innovators.",
      ourFounderImageUrl: contentMap["Our Founder Image Url"] || "",
      ourMissionText: contentMap["Our Mission Text"] || "Our mission is to create a dynamic and inclusive environment where students can explore their passion for robotics, develop technical and leadership skills, and collaborate on innovative projects that solve real-world problems.",
      ourVisionText: contentMap["Our Vision Text"] || "To be a leading university robotics club, recognized for our innovation, competitive spirit, and contribution to the field of robotics.",
      handsOnExperienceText: contentMap["Hands On Experience Text"] || "Gain practical skills in designing, building, and programming robots.",
      teamCollaborationText: contentMap["Team Collaboration Text"] || "Work with a diverse team of passionate students and learn from each other.",
      careerOpportunitiesText: contentMap["Career Opportunities Text"] || "Network with industry professionals and enhance your resume for future careers.",
    };
  } catch (error) {
    console.error("Error fetching about content:", error);
    // Return default values if fetch fails
    return {
      heroImageUrl: "",
      ourFounderText: "Founded by a visionary with a passion for robotics, our club started as a small group of enthusiasts and has grown into a thriving community of innovators. Our founder's dedication to hands-on learning and competitive excellence continues to be the driving force behind our success.",
      ourFounderImageUrl: "",
      ourMissionText: "Our mission is to create a dynamic and inclusive environment where students can explore their passion for robotics, develop technical and leadership skills, and collaborate on innovative projects that solve real-world problems. We aim to be a center of excellence that inspires the next generation of engineers and leaders.",
      ourVisionText: "To be a leading university robotics club, recognized for our innovation, competitive spirit, and contribution to the field of robotics. We envision a future where our members are at the forefront of technological advancement, shaping the world with their creativity and expertise.",
      handsOnExperienceText: "Gain practical skills in designing, building, and programming robots.",
      teamCollaborationText: "Work with a diverse team of passionate students and learn from each other.",
      careerOpportunitiesText: "Network with industry professionals and enhance your resume for future careers.",
    };
  }
}

export async function fetchOrganizationContent(): Promise<OrganizationContent> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_CONTENT_API_URL + "/organization");

    if (!response.ok) {
      throw new Error(`Failed to fetch organization content: ${response.statusText}`);
    }

    const data: ContentItem[] = await response.json();

    // Map the content items to a structured object
    const contentMap = data.reduce((acc, item) => {
      acc[item.ref] = item.content;
      return acc;
    }, {} as Record<string, string>);

    return {
      heroImageUrl: contentMap["Hero Image Url"] || "",
    };
  } catch (error) {
    console.error("Error fetching organization content:", error);
    // Return default values if fetch fails
    return {
      heroImageUrl: "",
    };
  }
}

export async function fetchOrganizationHierarchy(): Promise<OrganizationMember[]> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_CONTENT_API_URL + "/organization-team-hierarchy");

    if (!response.ok) {
      throw new Error(`Failed to fetch organization hierarchy: ${response.statusText}`);
    }

    const data: OrganizationMember[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching organization hierarchy:", error);
    // Return empty array if fetch fails
    return [];
  }
}

export async function fetchOrganizationPastDirectors(): Promise<OrganizationPastDirector[]> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_CONTENT_API_URL + "/organization-past-director");

    if (!response.ok) {
      throw new Error(`Failed to fetch organization past directors: ${response.statusText}`);
    }

    const data: OrganizationPastDirector[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching organization past directors:", error);
    // Return empty array if fetch fails
    return [];
  }
}

export async function fetchActivitiesContent(): Promise<ActivitiesContent> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_CONTENT_API_URL + "/activities");

    if (!response.ok) {
      throw new Error(`Failed to fetch activities content: ${response.statusText}`);
    }

    const data: ContentItem[] = await response.json();

    // Map the content items to a structured object
    const contentMap = data.reduce((acc, item) => {
      acc[item.ref] = item.content;
      return acc;
    }, {} as Record<string, string>);

    return {
      heroImageUrl: contentMap["Hero Image Url"] || "",
    };
  } catch (error) {
    console.error("Error fetching activities content:", error);
    // Return default values if fetch fails
    return {
      heroImageUrl: "",
    };
  }
}

export async function fetchActivitiesUpcoming(): Promise<UpcomingActivity[]> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_CONTENT_API_URL + "/activities-upcoming");

    if (!response.ok) {
      throw new Error(`Failed to fetch upcoming activities: ${response.statusText}`);
    }

    const data: ContentItem[] = await response.json();

    // Map the content items to a structured object
    const contentMap = data.reduce((acc, item) => {
      acc[item.ref] = item.content;
      return acc;
    }, {} as Record<string, string>);

    // Return as a single-item array since the API returns refs for one activity
    if (contentMap["Activity Date"]) {
      return [{
        "Image Url": contentMap["Image Url"] || "",
        "Activity Date": contentMap["Activity Date"] || "",
        "Activity Description": contentMap["Activity Description"] || "",
        "Activity Link": contentMap["Activity Link"] || "#",
      }];
    }

    return [];
  } catch (error) {
    console.error("Error fetching upcoming activities:", error);
    // Return empty array if fetch fails
    return [];
  }
}

export async function fetchActivitiesPast(): Promise<PastActivity[]> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_CONTENT_API_URL + "/activities-past");

    if (!response.ok) {
      throw new Error(`Failed to fetch past activities: ${response.statusText}`);
    }

    const data: PastActivity[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching past activities:", error);
    // Return empty array if fetch fails
    return [];
  }
}

export async function fetchActivitiesAchievements(): Promise<Achievement[]> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_CONTENT_API_URL + "/activities-achievements");

    if (!response.ok) {
      throw new Error(`Failed to fetch activities achievements: ${response.statusText}`);
    }

    const data: Achievement[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching activities achievements:", error);
    // Return empty array if fetch fails
    return [];
  }
}

export async function fetchRoboconContent(): Promise<RoboconContent> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_CONTENT_API_URL + "/robocon");

    if (!response.ok) {
      throw new Error(`Failed to fetch robocon content: ${response.statusText}`);
    }

    const data: ContentItem[] = await response.json();

    // Map the content items to a structured object
    const contentMap = data.reduce((acc, item) => {
      acc[item.ref] = item.content;
      return acc;
    }, {} as Record<string, string>);

    return {
      heroImageUrl: contentMap["Hero Image Url"] || "",
      whatIsRoboconText: contentMap["What Is Robocon Text"] || "ABU Robocon is an annual international robotics competition for undergraduate students in the Asia-Pacific region.",
      howWePrepareText: contentMap["How We Prepare Text"] || "Our preparation is a year-long cycle of dedication and hard work.",
      howWePrepareImageUrl: contentMap["How We Prepare Image Url"] || "",
      mechanicalTeamText: contentMap["Mechanical Team Text"] || "Designs and fabricates the robot's structure, ensuring durability and agility.",
      mechanicalTeamImageUrl: contentMap["Mechanical Team Image Url"] || "",
      electricalTeamText: contentMap["Electrical Team Text"] || "Manages all wiring, power distribution, and sensor integration.",
      electricalTeamImageUrl: contentMap["Electrical Team Image Url"] || "",
      programmingTeamText: contentMap["Programming Team Text"] || "Develops the robot's control software, from autonomous logic to manual controls.",
      programmingTeamImageUrl: contentMap["Programming Team Image Url"] || "",
    };
  } catch (error) {
    console.error("Error fetching robocon content:", error);
    // Return default values if fetch fails
    return {
      heroImageUrl: "",
      whatIsRoboconText: "ABU Robocon is an annual international robotics competition for undergraduate students in the Asia-Pacific region.",
      howWePrepareText: "Our preparation is a year-long cycle of dedication and hard work.",
      howWePrepareImageUrl: "",
      mechanicalTeamText: "Designs and fabricates the robot's structure, ensuring durability and agility.",
      mechanicalTeamImageUrl: "",
      electricalTeamText: "Manages all wiring, power distribution, and sensor integration.",
      electricalTeamImageUrl: "",
      programmingTeamText: "Develops the robot's control software, from autonomous logic to manual controls.",
      programmingTeamImageUrl: "",
    };
  }
}

export async function fetchRoboconAchievements(): Promise<RoboconAchievement[]> {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_CONTENT_API_URL + "/robocon-achievements");

    if (!response.ok) {
      throw new Error(`Failed to fetch robocon achievements: ${response.statusText}`);
    }

    const data: RoboconAchievement[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching robocon achievements:", error);
    // Return empty array if fetch fails
    return [];
  }
}
