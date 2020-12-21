import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import JobDetails from '../../components/forms/jobDetails/index';
import {
  getJob,
  getJobPriceAndInfo,
  getNextJobAction,
  getQuoteBoxContent
} from 'src/store/jobs/actions';
import {
  CargoDetail,
  Location,
  PriceAndInfoType,
  NextAction,
  quoteBoxInfo, InternalMessage,
} from '../../components/forms/jobDetails/type';
import {getInternalChat} from "../../store/shipmentForm/actions";

interface PageProps {
  cargoDetailInit: CargoDetail;
  locationsInit: Location[];
  priceAndInfo: PriceAndInfoType;
  nextActionInit: NextAction | null;
  jobState: string;
  distributionType: string;
  quoteBoxInfoInit: quoteBoxInfo;
  internalMessages : InternalMessage[];
}
// @ts-ignore
const Index: NextPage<PageProps> = ({
  cargoDetailInit,
  locationsInit,
  priceAndInfo,
  nextActionInit,
  jobState,
  distributionType,
  internalMessages,
}) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="container">
      <JobDetails
        // @ts-ignore
        jobId={id}
        cargoDetailInit={cargoDetailInit}
        locationsInit={locationsInit}
        priceAndInfoInit={priceAndInfo}
        nextActionInit={nextActionInit}
        JobStateInit={jobState}
        internalMessagesInit={internalMessages}
        isSpot={distributionType === 'SPOT'}
      />
    </div>
  );
};

// @ts-ignore
Index.getInitialProps = async (ctx) => {
  // @ts-ignore
  const priceAndInfo = await ctx.store.dispatch(getJobPriceAndInfo({ urlParts: [ctx.query.id] }));
  // @ts-ignore
  const response = await ctx.store.dispatch(getJob({ urlParts: [ctx.query.id] }));
  // @ts-ignore
  const locationInfo = await ctx.store.dispatch(getNextJobAction({ urlParts: [ctx.query.id] }));
  const { cargoDetail, locations, state, distributionType } = response;
  //@ts-ignore
  const messages = await ctx.store.dispatch(getInternalChat({urlParts: [ctx.query.id]}));
  // @ts-ignore

  // const quoteBoxInfoInit = await ctx.store.dispatch(getQuoteBoxContent({ urlParts: [ctx.query.id] }));
  return {
    response: response,
    priceAndInfo: priceAndInfo,
    cargoDetailInit: cargoDetail,
    locationsInit: locations,
    namespacesRequired: ['common'],
    nextActionInit: locationInfo,
    jobState: state,
    distributionType: distributionType,
    internalMessages : messages
  };
};

export default Index;
