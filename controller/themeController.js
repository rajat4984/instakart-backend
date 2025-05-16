import Theme from "../models/Theme.js";


// Get Theme by User ID
export const getTheme = async (req, res) => {
  try { 

    let userId= req.params.userId; // Assuming `userId` is available in the request object
    const theme = await Theme.findOne({ userId });
    console.log("Theme found:", userId); // Log the found theme for debugging  
    if (!theme) {
      return res.status(404).json({ message: "Theme not found" });
    }
    res.status(200).json(theme);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create or Update Theme
export const createOrUpdateTheme = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `userId` is available in the request object
    console.log("req.user"  , req.user); // Log the entire user object for debugging
    console.log("User ID controller:", userId); // Log the user ID for debugging
    const { banners, colors } = req.body;

    // Validate input
    if (!banners || !Array.isArray(banners)) {
      return res.status(400).json({ message: "Banners must be an array" });
    }
    if (!colors || !colors.primary || !colors.secondary) {
      return res.status(400).json({ message: "Colors must include primary and secondary" });
    }

    // Check if a theme already exists for the user
    let theme = await Theme.findOne({ userId });
    if (theme) {
      // Update existing theme
      theme.banners = banners;
      theme.colors = colors;
      await theme.save();
      return res.status(200).json({ message: "Theme updated successfully", theme });
    }

    // Create a new theme
    theme = new Theme({ userId, banners, colors });
    await theme.save();
    res.status(201).json({ message: "Theme created successfully", theme });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};