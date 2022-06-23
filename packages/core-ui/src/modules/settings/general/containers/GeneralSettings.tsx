import { AppConsumer } from 'appContext';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import Spinner from 'modules/common/components/Spinner';
import { Alert, withProps } from 'modules/common/utils';
import React from 'react';
import { graphql } from 'react-apollo';
import GeneralSettings from '../components/GeneralSettings';
import { mutations, queries } from '@erxes/ui-settings/src/general/graphql';
import {
  ConfigsQueryResponse,
  IConfigsMap
} from '@erxes/ui-settings/src/general/types';

type FinalProps = {
  configsQuery: ConfigsQueryResponse;
  constantsQuery;
  updateConfigs: (configsMap: IConfigsMap) => Promise<void>;
};

class SettingsContainer extends React.Component<FinalProps> {
  render() {
    const { updateConfigs, configsQuery, constantsQuery } = this.props;

    if (configsQuery.loading) {
      return <Spinner objective={true} />;
    }

    // create or update action
    const save = (map: IConfigsMap) => {
      updateConfigs({
        variables: { configsMap: map }
      })
        .then(() => {
          configsQuery.refetch();

          if (map.GOOGLE_MAP_API_KEY) {
            localStorage.setItem('GOOGLE_MAP_API_KEY', map.GOOGLE_MAP_API_KEY);
          }

          if (
            localStorage.getItem('GOOGLE_MAP_API_KEY') &&
            !map.GOOGLE_MAP_API_KEY
          ) {
            localStorage.removeItem('GOOGLE_MAP_API_KEY');
          }

          Alert.success('You successfully updated general settings');
        })
        .catch(error => {
          Alert.error(error.message);
        });
    };

    const configs = configsQuery.configs || [];

    const configsMap = {};

    for (const config of configs) {
      configsMap[config.code] = config.value;
    }

    return (
      <AppConsumer>
        {({ currentLanguage, changeLanguage }) => (
          <GeneralSettings
            {...this.props}
            configsMap={configsMap}
            constants={constantsQuery.configsConstants || {}}
            save={save}
            currentLanguage={currentLanguage}
            changeLanguage={changeLanguage}
          />
        )}
      </AppConsumer>
    );
  }
}

export default withProps<{}>(
  compose(
    graphql<{}, ConfigsQueryResponse>(gql(queries.configs), {
      name: 'configsQuery'
    }),
    graphql<{}>(gql(queries.configsConstants), {
      name: 'constantsQuery'
    }),
    graphql<{}>(gql(mutations.updateConfigs), {
      name: 'updateConfigs'
    })
  )(SettingsContainer)
);