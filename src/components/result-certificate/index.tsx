import StarIcon from "@/assets/icon/star-icon.svg";
import StartActiveIcon from "@/assets/icon/start-color-icon.svg";
import ROUTER from "@/shared/const/router.const";
import { Avatar, Box, Button, Theme, Typography, useMediaQuery } from "@mui/material";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Link, useNavigate } from "react-router-dom";
import DownloadIcon from "../icons/dowload-icon";
import LogoCertificateIcon from "../icons/logo-certificate-icon";
import ShareIcon from "../icons/share-icon";
import UndoIcon from "../icons/undo-icon";
import { IUserCertificate } from "@/core/type/index";

import { formatDMMMYYYY } from "@/shared/utils/date";

interface IModalCompleteCertificateProps {
  userCertificate: IUserCertificate;
  onClickTestAgain: () => void;
}
const ResultCertificate = (props: IModalCompleteCertificateProps) => {
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const { userCertificate, onClickTestAgain } = props;
  const { archivedDate, certificateName, nickName, score, totalScore, star, certificateId, slug } = userCertificate;

  const handleDownloadCertificate = () => {
    const input = document.getElementById("download-certificate");
    if (!input) {
      return;
    }
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a5");
      const pdfWidth = 148;
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "png", 0, 10, imgWidth, imgHeight);
      pdf.save("download.pdf");
    });
  };

  return (
    <Box className="flex mt-4 items-center justify-center">
      <Box
        sx={{
          width: "640px",
          maxWidth: "calc(100% - 32px)",
          position: "relative",
        }}
        className="mb-5 shadow-[0_1px_3px_0px_#A6AFC366] bg-white rounded-2xl max-w-[calc(100% - 32px)] flex flex-col items-center justify-center"
      >
        <div className="pt-4 px-4 flex flex-col items-center">
          <LogoCertificateIcon />

          <Box className="flex gap-5 mt-4 mb-3">
            {[1, 2, 3, 4].map((item) => {
              return <Avatar key={item} className="w-5 h-5" variant="square" src={star < item ? StarIcon : StartActiveIcon} />;
            })}
          </Box>
          <Typography className="text-center text-2xl font-semibold mb-2 ">{certificateName}</Typography>
          <Typography className="text-center text-textSecondary font-semibold mb-2">{`Result: ${
            (score * 100) / totalScore
          }%`}</Typography>

          <Box className="p-4 w-full flex flex-col items-center">
            <Typography className="text-center text-textSecondary font-medium">Proudly presented to</Typography>
            <Typography className="text-center tracking-wide text-secondary uppercase text-3xl md:text-5xl !leading-[1.1] font-semibold pt-2 md:pt-6 pb-2 md:pb-4">
              {nickName}
            </Typography>
            <Typography className="text-center mb-2 md:mb-4">For successfully completed recording TechTalk’s lecture</Typography>
            {archivedDate && <Typography className="text-center text-sm ">{formatDMMMYYYY(archivedDate)}</Typography>}
          </Box>
        </div>
        <div id="download-certificate" className="absolute -top-[10000px] w-[640px] pt-6 px-6 flex flex-col items-center mb-6">
          <LogoCertificateIcon />

          <Box className="flex gap-5 mt-4 mb-3">
            {[1, 2, 3, 4].map((item) => {
              return <Avatar key={item} className="w-5 h-5" variant="square" src={star < item ? StarIcon : StartActiveIcon} />;
            })}
          </Box>
          <Typography className="text-center text-3xl font-semibold mb-6">{certificateName}</Typography>
          <Typography className="text-center text-textSecondary font-semibold mb-6">{`  Result: ${
            (score * 100) / totalScore
          }%`}</Typography>

          <Box className="p-6 w-full flex flex-col items-center">
            <Typography className="text-textSecondary text-lg font-medium">Proudly presented to</Typography>
            <Typography className="tracking-wide text-secondary uppercase text-3xl md:text-5xl !leading-[1.1] font-semibold pt-2 md:pt-6 pb-4 text-center">
              {nickName}
            </Typography>
            <Typography className="text-center mb-4">For successfully completed recording TechTalk’s lecture</Typography>
            {archivedDate && <Typography className="">{formatDMMMYYYY(archivedDate)}</Typography>}
          </Box>
        </div>

        <Box className="p-4 border-solid border-0 border-t border-t-stroke gap-6 md:gap-1 flex flex-wrap md:flex-row w-full items-center justify-around md:justify-between ">
          <Button onClick={onClickTestAgain} startIcon={<UndoIcon />} className="text-base font-semibold" color="primary">
            Test again
          </Button>
          <Button
            onClick={handleDownloadCertificate}
            startIcon={<DownloadIcon />}
            className=" text-base font-semibold"
            color="primary"
          >
            Download
          </Button>
          <Link target="_blank" to={`${ROUTER.CERTIFICATE_USER}/${slug}`}>
            <Button
              fullWidth={isSmallScreen}
              startIcon={<ShareIcon />}
              className="px-8 rounded-2xl text-base font-semibold"
              color="primary"
            >
              Share
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ResultCertificate;
