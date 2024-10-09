import { useState, useEffect } from "react";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dialog";
import {
  Bookmark,
  ClipboardCheck,
  Heart,
  Link,
  Mail,
  RefreshCcw,
  Share,
  Share2,
  ArrowLeft,
} from "lucide-react";
import { AlertDescription } from "@/components/ui/alert";
import Image from "next/image";

interface TweetProps {
  username: string;
  handle: string;
  profileImage: string;
  content: string;
}

export function Tweet({
  username,
  handle,
  profileImage,
  content,
}: Readonly<TweetProps>) {
  const [typedContent, setTypedContent] = useState(""); // For typing effect
  const typingSpeed = 50;
  const [isLiked, setIsLiked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactElement | undefined>(
    undefined
  ); // Correct type
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const type = () => {
      if (currentIndex < content.length) {
        setTypedContent((prev) => prev + content.charAt(currentIndex));
        currentIndex++;
      }
    };

    const typingInterval = setInterval(type, typingSpeed);

    // Cleanup interval when the component unmounts
    return () => clearInterval(typingInterval);
  }, [content]);

  // Toggle the like state on button click
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      // If clipboard API is available
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          setAlertContent("Link copied to clipboard!");
          setAlertIcon(<ClipboardCheck className="h-6 w-6 text-green-500" />);
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 2500);
        })
        .catch((error) => console.error("Failed to copy: ", error));
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setAlertContent("Link copied to clipboard!");
        setAlertIcon(<ClipboardCheck className="h-6 w-6 text-green-500" />);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2500);
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleSharePage = () => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          text: "Check out this page!",
          url: window.location.href,
        })
        .then(() => {
          setAlertContent("Page shared successfully");
          setAlertIcon(<ClipboardCheck className="h-6 w-6 text-green-500" />);
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 2500);
        })
        .catch((error) => console.error("Error sharing page:", error));
    } else {
      setAlertIcon(<ClipboardCheck className="h-6 w-6 text-red-500" />);
      setAlertContent(
        "Sharing is not supported in your browser. Please copy the link manually."
      );
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2500);
    }
  };

  const handleContactNow = () => {
    const email = "tamkc1999@gmail.com";
    const subject = "Contact Inquiry";
    const body = `
        Dear Kam Chuen,

          I am particularly interested in understanding more about your skills in [specific skill or expertise, e.g., web development, Python, NodeJs, ReactJs]. Could you please provide detailed information on this?

          Additionally, I would appreciate it if you could let me know about any [additional questions or details you need].

          I look forward to your response.

          Best regards,
          [Name]
          [Contact Information (optional)]
    `;

    // Create the mailto link with plain text subject and body
    const encodedBody = encodeURIComponent(body.trim());
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodedBody}`;

    // Open the default email client
    window.location.href = mailtoLink;
  };

  return (
    <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-xl shadow-md mx-auto mt-10">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex space-x-4">
          <div>
            <Image
              alt="Profile"
              className="rounded-full border border-black "
              height="48"
              src={profileImage}
              width="48"
              style={{ aspectRatio: "48/48", objectFit: "cover" }}
            />
          </div>
          <div>
            <div className="text-lg font-patrick-hand dark:text-white">
              {username}
            </div>
            <div className="text-xs font-mono text-gray-500 dark:text-gray-200">
              @{handle}
            </div>
          </div>
        </div>
        <div>
          <Select>
            <SelectTrigger aria-label="Options">
              <div className="font-patrick-hand">Option</div>
            </SelectTrigger>
            <SelectContent>
              <div className="flex items-center">
                <a
                  href="/resume/TAM_KAM_CHUEN_Resume.pdf" // Path to your resume file
                  download="resume.pdf" // Filename to save the file as
                  className="px-6 py-3 bg-white text-black border border-black rounded-md font-handwriting text-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  Download Resume
                </a>
              </div>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="text-10lg text-gray-800 dark:text-gray-200 items-center text-center">
          {typedContent}
        </div>
      </div>
      <div className="flex justify-between items-center space-x-1 pt-4 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-1">
          <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
            <RefreshCcw className="h-4 w-4 text-gray-500 dark:text-gray-200" />
          </button>
          <button
            onClick={handleLikeClick}
            className={`p-2 rounded-md focus:outline-none transition-colors duration-200 ${
              isLiked
                ? "bg-red-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Heart
              className={`h-4 w-4 ${
                isLiked ? "text-white" : "text-gray-500 dark:text-gray-200"
              }`}
            />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
              <Share className="h-4 w-4 text-gray-500 dark:text-gray-200" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleCopyLink}>
                <Link className="mr-2 h-4 w-4" />
                Copy Link
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSharePage}>
                <Share2 className="mr-2 h-4 w-4" />
                Share Page Via...
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleContactNow}>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center animate-pulse">
            <ArrowLeft className="h-4 w-4 text-gray-500 dark:text-gray-200" />
            <span className="ml-1 text-gray-500 font-mono dark:text-gray-200 text-xs">
              Share This Portfolio
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={handleBookmarkClick}
            className="p-2 rounded-md bg-white
                 dark:bg-gray-800
                 hover:bg-gray-200
                 active:bg-gray-300
                 focus:outline-none transition-colors duration-150"
          >
            <Bookmark
              className={`h-4 w-4
          ${
            isBookmarked
              ? "text-black dark:text-white"
              : "text-gray-500 dark:text-gray-200"
          }
          transition-colors duration-150`}
              style={{ fill: isBookmarked ? "currentColor" : undefined }}
            />
          </button>
        </div>
      </div>
      {showAlert && (
        <div className="fixed top-10 right-10 m-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex items-center space-x-2">
          {alertIcon}
          <AlertDescription className="font-patrick-hand text-gray-700">
            {alertContent}
          </AlertDescription>
        </div>
      )}
    </div>
  );
}
