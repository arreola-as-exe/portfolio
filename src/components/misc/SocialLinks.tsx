import { useSocialLinks } from "@/app/hooks/useSocialLinks";
import { IIcon } from "@/domain/types";
import React from "react";
import { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import IconLinks from "../utils/IconLinks";

const Icons: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
};

const SocialLinks = () => {
  const socialMedia = useSocialLinks();

  return (
    <IconLinks
      icons={socialMedia.map((icon) => {
        return {
          url: icon.url,
          icon: Icons[icon.key],
          color: icon.color,
        };
      })}
    />
  );
};

export default SocialLinks;
