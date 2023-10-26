import BoxCard from "@/components/BoxCard";
import { Container, Typography, Avatar, Box, Button } from "@mui/material";

import UserIcon from "@/assets/icon/user-icon.svg";
import ClockIcon from "@/assets/icon/clock-icon.svg";
import MessageIcon from "@/assets/icon/message-icon.svg";
import { useNavigate, useParams } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import { IChallengeDisplay } from "@/core/type/challenge.type";
import { useGetChallengesInClubQuery } from "@/core/services/challenge.service";
import { timeSince } from "@/shared/utils/timeSince.util";
import { useEffect, useMemo } from "react";
import persist from "@/shared/utils/persist.util";

function ChallengeCard(props: IChallengeDisplay) {
  const navigate = useNavigate();
  const myId = persist.getMyInfo().userId;
  console.log("ChallengeCard", props);

  const isRerecord = useMemo(() => {
    return !!props.participants.find((user) => user.id === myId);
  }, [props]);

  const onHandleRecording = () => {
    navigate(
      {
        pathname: ROUTER.CLUB_RECORDING,
        hash: "0",
      },
      {
        state: {
          challengeId: props.challengeId,
          clubId: props.clubId.id,
        },
      }
    );
  };

  const onHandleListening = () => {
    navigate(
      {
        pathname: ROUTER.CLUB_LISTENING,
      },
      {
        state: {
          challengeId: props.challengeId,
          clubId: props.clubId.id,
        },
      }
    );
  };

  if (!props) return <>There's no challenge</>;
  return (
    <BoxCard classes='p-4 flex flex-col gap-2'>
      <Typography className='text-base-semibold mb-8'>{props.challengeName ?? ""}</Typography>

      <Typography className='text-extra-small-regular flex gap-1' variant='body2'>
        <Avatar component={"span"} src={MessageIcon} alt='speaking-icon' className='w-4 h-4' />
        {props.vocabularies.length > 1 ? props.vocabularies.length + " sentences" : props.vocabularies.length + " sentence"}
      </Typography>

      <Typography className='text-extra-small-regular flex gap-1' variant='body2'>
        <Avatar component={"span"} src={UserIcon} alt='speaking-icon' className='w-4 h-4' />
        {props.participants.length > 1 ? props.participants.length + " members" : props.participants.length + " member"}
      </Typography>

      <Typography className='text-extra-small-regular flex gap-1' variant='body2'>
        <Avatar component={"span"} src={ClockIcon} alt='speaking-icon' className='w-4 h-4' />
        {"Created " + timeSince(new Date(props?.created?.seconds * 1000).getTime()) + " ago"}
      </Typography>

      <Box className='flex justify-between gap-4 mt-4'>
        <Button variant='outlined' fullWidth onClick={onHandleRecording}>
          {isRerecord ? "Re-record" : "Record"}
        </Button>
        <Button variant='outlined' fullWidth onClick={onHandleListening}>
          Listen
        </Button>
      </Box>
    </BoxCard>
  );
}

export default function ClubStudyPage() {
  const { clubId } = useParams();

  const { data } = useGetChallengesInClubQuery(clubId!);

  return <Container className='mt-6 grow'>{data && data.map((challenge) => <ChallengeCard key={challenge.challengeId} {...challenge} />)}</Container>;
}