import ISport from '../../api/sports/Sport.type';
import useAvaliableSportsQuery from '../../api/sports/useAvaliableSportsQuery';
import handleApoloError from '../../utils/handleApoloError';
import { ApolloError } from 'apollo-client';

export default function useNamedSports(
  sportIds?: number[]
): { loading: boolean; sports: ISport[]; error?: ApolloError } {
  const { data, error, loading } = useAvaliableSportsQuery();

  if (!sportIds) {
    return { loading: false, sports: [] };
  }

  if (error) {
    return { loading: false, sports: [], error };
  }

  if (loading) {
    return { loading, sports: [] };
  }

  const sports = sportIds.map(sportId => {
    const sport: ISport = data.sports.find(sp => sp.id === sportId);
    return sport;
  });
  return { loading, sports };
}
