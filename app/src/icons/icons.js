/**
 * Icons pickable for both the user and bot
 *
 * author :
 *  Mason Marker
 */

// Chakra box
import { Box } from "@chakra-ui/react";

// import user icons
import {
  FaUserCircle,
  FaUser,
  FaUserAstronaut,
  FaUserNinja,
  FaUserSecret,
  FaUserTie,
  FaUserGraduate,
} from "react-icons/fa";

// import robot icons
import { TbRobot } from "react-icons/tb";
import { FaRobot } from "react-icons/fa";
import { GiRobotAntennas } from "react-icons/gi";
import { GiRobotGolem } from "react-icons/gi";
import { BsRobot } from "react-icons/bs";

// userIcons
const userIcons = [
  <FaUser />,
  <FaUserCircle />,
  <FaUserAstronaut />,
  <FaUserNinja />,
  <FaUserSecret />,
  <FaUserTie />,
  <FaUserGraduate />,
];

// botIcons
const botIcons = [
  <TbRobot />,
  <FaRobot />,
  <GiRobotAntennas />,
  <GiRobotGolem />,
  <BsRobot />,
];

export { userIcons, botIcons };
