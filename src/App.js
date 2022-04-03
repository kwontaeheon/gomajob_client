import React from "react";
import moment from "moment";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import {
  PagingInfo,
  ResultsPerPage,
  Paging,
  Facet,
  SearchProvider,
  Results,
  SearchBox,
  Sorting
} from "@elastic/react-search-ui";
import ResultView from "./ResultView";
import { Layout } from "@elastic/react-search-ui-views";

import "@elastic/react-search-ui-views/lib/styles/styles.css";
import "./styles.css";

const connector = new AppSearchAPIConnector({
  searchKey: "search-yjbz4bto7a5aeycvnrgqwjos",
  engineName: "career-search-engine",
  // hostIdentifier: "http://maum.mooo.com",
  endpointBase: "https://maum.mooo.com",
  // hostIdentifier: "host-2376rb"
  // beforeSearchCall: (existingSearchOptions, next) =>
  //   next({
  //     ...existingSearchOptions,
  //     group: { field: "url_host" }
  //   })

});

const configurationOptions = {
  apiConnector: connector,
  autocompleteQuery: {
    suggestions: {
      types: {
        documents: {
          // Which fields to search for suggestions.
          fields: ["body_content"]
        }
      },
      // How many suggestions appear.
      size: 6
    }
  },
  alwaysSearchOnInitialLoad: true,
  searchQuery: {
    
    search_fields: {
      // 1. Search by content
      body_content: {}
    },
    // 2. Results: name of the video game, its genre, publisher, scores, and platform.
    result_fields: {
      last_crawled_at: {
        // A snippet means that matching search terms will be highlighted via <em> tags.
        raw: {}
        // snippet: {
        //   size: 10, // Limit the snippet to 75 characters.
        //   fallback: true // Fallback to a "raw" result.
        // }
      },
      body_content: {
        raw: {},
        // A snippet means that matching search terms will be highlighted via <em> tags.
        snippet: {
          size: 1000, // Limit the snippet to 75 characters.
          fallback: true // Fallback to a "raw" result.
        }
      }, 
      title: {
        raw: {},
        snippet: {
          size: 150, // Limit the snippet to 150 characters.
          fallback: true // Fallback to a "raw" result.
        }
      }, 
      url: {
        raw: {}
      },
      url_host: {
        snippet: {
          size: 75, // Limit the snippet to 75 characters.
          fallback: true // Fallback to a "raw" result.
        }
      },
      company_name: {
        raw: {}
      },
      job_class: {
        raw: {}
      }
    },
    // 3. Facet by scores, genre, publisher, and platform, which we'll use to build filters later.
    facets: {
      url_host: {
        type: "value", 
        size: 100
      },
      last_crawled_at: {
        type: "range",
        ranges: [
          {
            from: moment()
              .subtract(1, "days")
              .toISOString(),
            name: "1일 이내"
          },
          {
            from: moment()
              .subtract(7, "days")
              .toISOString(),
            to: moment()
              .subtract(1, "days")
              .toISOString(),
            name: "1일 ~ 7일"
          },
          {
            from: moment()
              .subtract(21, "days")
              .toISOString(),
            to: moment()
              .subtract(7, "days")
              .toISOString(),
            name: "7일 ~ 21일"
          },
          {
            to: moment()
              .subtract(21, "days")
              .toISOString(),
            name: "21일 ~"
          }
        ]
      },
      title: { 
        type: "value", size: 100 
      },
      company_name: {
        type: "value", size: 100 
      }, 
      job_class: {
        type: "value", size: 100 
      }
    }
    
  }
};

export default function App() {
  return (
    <SearchProvider config={configurationOptions}>
      <div className="App">
        <Layout
          header={
            <SearchBox 
            
            autocompleteSuggestions={true}
            inputProps={{ placeholder: "검색하기"}}
            // onSubmit={(e) => {return e;}}
            // inputView={({ getAutocomplete, getInputProps, getButtonProps }) => (
            //   <>
            //     <div className="sui-search-box__wrapper">
            //       <input
            //         {...getInputProps(({
            //           // placeholder: "I am a custom placeholder"
            //           // console.log(value);
            //         }))}
            //         // value=
            //         // onChange={(e) => {
            //         //   console.log(e);
            //         //   e.currentTarget.value =  e.currentTarget.value + "test";
            //         //   e.super(e);
            //         // }}
            //       />
            //       {getAutocomplete()}
            //     </div>
            //     <input
            //       {...getButtonProps({
            //         "data-custom-attr": "some value"
            //       })}
            //     />
            //   </>
            // )}
            debounceLength={1500}
            searchAsYouType={true}
            // autocompleteResults={{
            //   linkTarget: "_blank",
            //   sectionTitle: "추천결과",
            //   titleField: "title",
            //   urlField: "url",
            //   shouldTrackClickThrough: true,
            // }}
            />}
          bodyContent={
            <Results
              titleField="title"
              urlField="url"
              resultView={ResultView}
            />
          }
          sideContent={
            <div>
              <Sorting
                label={"정렬 순서"}
                sortOptions={[
                  {
                    name: "검색연관성",
                    value: "",
                    direction: ""
                  },
                  {
                    name: "수집일시",
                    value: "last_crawled_at",
                    direction: "desc"
                  }
                ]}
              />
              <Facet field="company_name" label="회사명"  />
              
              <Facet field="job_class" label="직무" isFilterable={true} />
              <Facet field="last_crawled_at" label="수집일시" isFilterable={true} />
              
            </div>
          }
          bodyHeader={
            <>
              <PagingInfo />
              <ResultsPerPage />
            </>
          }
          bodyFooter={<Paging />}
        />
      </div>
    </SearchProvider>
  );
}
