// import { Block } from 'galio-framework';
// import React, { Component } from 'react';
// import { StyleSheet, Text, View ,Dimensions} from 'react-native';
// import { WebView } from 'react-native-webview';


// const { width,height } = Dimensions.get("screen");


// export default function PrivacyPolicy (){
  
//     return(
//  <Block  style={{width:width,height:height}}>
//       <WebView source={{ uri: "https://www.shareslate.com/privacy" }} />
//  </Block>
//     )
// }






import React from "react";
import { StyleSheet, View, ScrollView, Linking } from "react-native";
import argonTheme from "../constants/Theme";
import { Block, Checkbox, Text } from "galio-framework";
// import { ScrollView } from 'react-native-gesture-handler';

export default function TermAndCondition() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            alignSelf: "center",
            marginVertical: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
         Privacy Policies

        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"

          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          These terms and conditions ("Agreement") set forth the general terms
          and conditions of your use of the{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL("http://shareslate.com")}
          >
            shareslate.com{" "}
          </Text>
          website ("Website" or "Service") and any of its related products and
          services {"\n"}(collectively, "Services"). This Agreement is legally
          binding between you ("User", "you" or "your") and Share Slate INC
          ("Share Slate INC", "we", "us" or "our").{"\n"}By accessing and using
          the Website and Services, you acknowledge that you have read,
          understood, and agree to be bound by the terms of this Agreement. If
          you are entering into this Agreement on behalf of a business or other
          legal entity, you represent that you have the authority to bind such
          entity to this Agreement, in which case the terms "User", "you" or
          "your" shall refer to such entity. If you do not have such authority,
          or if you do not agree with the terms of this Agreement, you must not
          accept this Agreement and may not access and use the Website and
          Services. You acknowledge that this Agreement is a contract between
          you and Share Slate INC, even though it is electronic and is not
          physically signed by you, and it governs your use of the Website and
          Services.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Accounts and membership
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          You must be at least 13 years of age to use the Website and Services.
          By using the Website and Services and by agreeing to this Agreement
          you warrant and represent that you are at least 13 years of age. If
          you create an account on the Website, you are responsible for
          maintaining the security of your account and you are fully responsible
          for all activities that occur under the account and any other actions
          taken in connection with it. We may, but have no obligation to,
          monitor and review new accounts before you may sign in and start using
          the Services. Providing false contact information of any kind may
          result in the termination of your account. You must immediately notify
          us of any unauthorized uses of your account or any other breaches of
          security. We will not be liable for any acts or omissions by you,
          including any damages of any kind incurred as a result of such acts or
          omissions. We may suspend, disable, or delete your account (or any
          part thereof) if we determine that you have violated any provision of
          this Agreement or that your conduct or content would tend to damage
          our reputation and goodwill. If we delete your account for the
          foregoing reasons, you may not re-register for our Services. We may
          block your email address and Internet protocol address to prevent
          further registration.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          User content
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          We do not own any data, information or material (collectively,
          "Content") that you submit on the Website in the course of using the
          Service. You shall have sole responsibility for the accuracy, quality,
          integrity, legality, reliability, appropriateness, and intellectual
          property ownership or right to use of all submitted Content. We may,
          but have no obligation to, monitor and review the Content on the
          Website submitted or created using our Services by you. You grant us
          permission to access, copy, distribute, store, transmit, reformat,
          display and perform the Content of your user account solely as
          required for the purpose of providing the Services to you. Without
          limiting any of those representations or warranties, we have the
          right, though not the obligation, to, in our own sole discretion,
          refuse or remove any Content that, in our reasonable opinion, violates
          any of our policies or is in any way harmful or objectionable. You
          also grant us the license to use, reproduce, adapt, modify, publish or
          distribute the Content created by you or stored in your user account
          for commercial, marketing or any similar purpose.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Adult content
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          Please be aware that there may be certain adult or mature content
          available on the Website. Where there is mature or adult content,
          individuals who are less than 18 years of age or are not permitted to
          access such content under the laws of any applicable jurisdiction may
          not access such content. If we learn that anyone under the age of 18
          seeks to conduct a transaction through the Services, we will require
          verified parental consent, in accordance with the Children's Online
          Privacy Protection Act of 1998 ("COPPA"). Certain areas of the Website
          and Services may not be available to children under 18 under any
          circumstances.
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Billing and payments
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          You shall pay all fees or charges to your account in accordance with
          the fees, charges, and billing terms in effect at the time a fee or
          charge is due and payable. Where Services are offered on a free trial
          basis, payment may be required after the free trial period ends, and
          not when you enter your billing details (which may be required prior
          to the commencement of the free trial period). If auto-renewal is
          enabled for the Services you have subscribed for, you will be charged
          automatically in accordance with the term you selected. If, in our
          judgment, your purchase constitutes a high-risk transaction, we will
          require you to provide us with a copy of your valid government-issued
          photo identification, and possibly a copy of a recent bank statement
          for the credit or debit card used for the purchase. We reserve the
          right to change products and product pricing at any time. We also
          reserve the right to refuse any order you place with us. We may, in
          our sole discretion, limit or cancel quantities purchased per person,
          per household or per order. These restrictions may include orders
          placed by or under the same customer account, the same credit card,
          and/or orders that use the same billing and/or shipping address. In
          the event that we make a change to or cancel an order,we may attempt
          to notify you by contacting the e-mail and/or billing address/phone
          number provided at the time the order was made.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Accuracy of information
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          Occasionally there may be information on the Website that contains
          typographical errors, inaccuracies or omissions that may relate to
          product descriptions, pricing, availability, promotions and offers. We
          reserve the right to correct any errors, inaccuracies or omissions,
          and to change or update information or cancel orders if any
          information on the Website or Services is inaccurate at any time
          without prior notice (including after you have submitted your order).
          We undertake no obligation to update, amend or clarify information on
          the Website including, without limitation, pricing information, except
          as required by law. No specified update or refresh date applied on the
          Website should be taken to indicate that all information on the
          Website or Services has been modified or updated.
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Third party services
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          If you decide to enable, access or use third party services, be
          advised that your access and use of such other services are governed
          solely by the terms and conditions of such other services, and we do
          not endorse, are not responsible or liable for, and make no
          representations as to any aspect of such other services, including,
          without limitation, their content or the manner in which they handle
          data (including your data) or any interaction between you and the
          provider of such other services. You irrevocably waive any claim
          against Share Slate INC with respect to such other services. Share
          Slate INC is not liable for any damage or loss caused or alleged to be
          caused by or in connection with your enablement, access or use of any
          such other services, or your reliance on the privacy practices, data
          security processes or other policies of such other services. You may
          be required to register for or log into such other services on their
          respective platforms. By enabling any other services, you are
          expressly permitting Share Slate INC to disclose your data as
          necessary to facilitate the use or enablement of such other service.
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Backups
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          We perform regular backups of the Website and its Content, however,
          these backups are for our own administrative purposes only and are in
          no way guaranteed. You are responsible for maintaining your own
          backups of your data. We do not provide any sort of compensation for
          lost or incomplete data in the event that backups do not function
          properly. We will do our best to ensure complete and accurate backups,
          but assume no responsibility for this duty.
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Advertisements
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          During your use of the Website and Services, you may enter into
          correspondence with or participate in promotions of advertisers or
          sponsors showing their goods or services through the Website and
          Services. Any such activity, and any terms, conditions, warranties or
          representations associated with such activity, is solely between you
          and the applicable third party. We shall have no liability, obligation
          or responsibility for any such correspondence, purchase or promotion
          between you and any such third party.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Links to other resources
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          Although the Website and Services may link to other resources (such as
          websites, mobile applications, etc.), we are not, directly or
          indirectly, implying any approval, association, sponsorship,
          endorsement, or affiliation with any linked resource, unless
          specifically stated herein. Some of the links on the Website may be
          "affiliate links". This means if you click on the link and purchase an
          item, Share Slate INC will receive an affiliate commission. We are not
          responsible for examining or evaluating, and we do not warrant the
          offerings of, any businesses or individuals or the content of their
          resources. We do not assume any responsibility or liability for the
          actions, products, services, and content of any other third parties.
          You should carefully review the legal statements and other conditions
          of use of any resource which you access through a link on the Website
          and Services. Your linking to any other off-site resources is at your
          own risk.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Prohibited uses
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          In addition to other terms as set forth in the Agreement, you are
          prohibited from using the Website and Services or Content: (a) for any
          unlawful purpose; (b) to solicit others to perform or participate in
          any unlawful acts; (c) to violate any international, federal,
          provincial or state regulations, rules, laws, or local ordinances; (d)
          to infringe upon or violate our intellectual property rights or the
          intellectual property rights of others; (e) to harass, abuse, insult,
          harm, defame, slander, disparage, intimidate, or discriminate based on
          gender, sexual orientation, religion, ethnicity, race, age, national
          origin, or disability; (f) to submit false or misleading information;
          (g) to upload or transmit viruses or any other type of malicious code
          that will or may be used in any way that will affect the functionality
          or operation of the Website and Services, third party products and
          services, or the Internet; (h) to spam, phish, pharm, pretext, spider,
          crawl, or scrape; (i) for any obscene or immoral purpose; or (j) to
          interfere with or circumvent the security features of the Website and
          Services, third party products and services, or the Internet. We
          reserve the right to terminate your use of the Website and Services
          for violating any of the prohibited uses.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Intellectual property rights
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          "Intellectual Property Rights" means all present and future rights
          conferred by statute, common law or equity in or in relation to any
          copyright and related rights, trademarks, designs, patents,
          inventions, goodwill and the right to sue for passing off, rights to
          inventions, rights to use, and all other intellectual property rights,
          in each case whether registered or unregistered and including all
          applications and rights to apply for and be granted, rights to claim
          priority from, such rights and all similar or equivalent rights or
          forms of protection and any other results of intellectual activity
          which subsist or will subsist now or in the future in any part of the
          world. This Agreement does not transfer to you any intellectual
          property owned by Share Slate INC or third parties, and all rights,
          titles, and interests in and to such property will remain (as between
          the parties) solely with Share Slate INC. All trademarks, service
          marks, graphics and logos used in connection with the Website and
          Services, are trademarks or registered trademarks of Share Slate INC
          or its licensors. Other trademarks, service marks, graphics and logos
          used in connection with the Website and Services may be the trademarks
          of other third parties. Your use of the Website and Services grants
          you no right or license to reproduce or otherwise use any of Share
          Slate INC or third party trademarks.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Disclaimer of warranty
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          You agree that such Service is provided on an "as is" and "as
          available" basis and that your use of the Website and Services is
          solely at your own risk. We expressly disclaim all warranties of any
          kind, whether express or implied, including but not limited to the
          implied warranties of merchantability, fitness for a particular
          purpose and non-infringement. We make no warranty that the Services
          will meet your requirements, or that the Service will be
          uninterrupted, timely, secure, or error-free; nor do we make any
          warranty as to the results that may be obtained from the use of the
          Service or as to the accuracy or reliability of any information
          obtained through the Service or that defects in the Service will be
          corrected. You understand and agree that any material and/or data
          downloaded or otherwise obtained through the use of Service is done at
          your own discretion and risk and that you will be solely responsible
          for any damage or loss of data that results from the download of such
          material and/or data. We make no warranty regarding any goods or
          services purchased or obtained through the Service or any transactions
          entered into through the Service unless stated otherwise. No advice or
          information, whether oral or written, obtained by you from us or
          through the Service shall create any warranty not expressly made
          herein.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Limitation of liability
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          To the fullest extent permitted by applicable law, in no event will
          Share Slate INC, its affiliates, directors, officers, employees,
          agents, suppliers or licensors be liable to any person for any
          indirect, incidental, special, punitive, cover or consequential
          damages (including, without limitation, damages for lost profits,
          revenue, sales, goodwill, use of content, impact on business, business
          interruption, loss of anticipated savings, loss of business
          opportunity) however caused, under any theory of liability, including,
          without limitation, contract, tort, warranty, breach of statutory
          duty, negligence or otherwise, even if the liable party has been
          advised as to the possibility of such damages or could have foreseen
          such damages. To the maximum extent permitted by applicable law, the
          aggregate liability of Share Slate INC and its affiliates, officers,
          employees, agents, suppliers and licensors relating to the services
          will be limited to an amount greater of one dollar or any amounts
          actually paid in cash by you to Share Slate INC for the prior one
          month period prior to the first event or occurrence giving rise to
          such liability. The limitations and exclusions also apply if this
          remedy does not fully compensate you for any losses or fails of its
          essential purpose.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Indemnification
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          You agree to indemnify and hold Share Slate INC and its affiliates,
          directors, officers, employees, agents, suppliers and licensors
          harmless from and against any liabilities, losses, damages or costs,
          including reasonable attorneys' fees, incurred in connection with or
          arising from any third party allegations, claims, actions, disputes,
          or demands asserted against any of them as a result of or relating to
          your Content, your use of the Website and Services or any willful
          misconduct on your part.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Severability
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          All rights and restrictions contained in this Agreement may be
          exercised and shall be applicable and binding only to the extent that
          they do not violate any applicable laws and are intended to be limited
          to the extent necessary so that they will not render this Agreement
          illegal, invalid or unenforceable. If any provision or portion of any
          provision of this Agreement shall be held to be illegal, invalid or
          unenforceable by a court of competent jurisdiction, it is the
          intention of the parties that the remaining provisions or portions
          thereof shall constitute their agreement with respect to the subject
          matter hereof, and all such remaining provisions or portions thereof
          shall remain in full force and effect.
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Dispute resolution
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          The formation, interpretation, and performance of this Agreement and
          any disputes arising out of it shall be governed by the substantive
          and procedural laws of California, United States without regard to its
          rules on conflicts or choice of law and, to the extent applicable, the
          laws of United States. The exclusive jurisdiction and venue for
          actions related to the subject matter hereof shall be the courts
          located in California, United States, and you hereby submit to the
          personal jurisdiction of such courts. You hereby waive any right to a
          jury trial in any proceeding arising out of or related to this
          Agreement. The United Nations Convention on Contracts for the
          International Sale of Goods does not apply to this Agreement.
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Assignment
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          You may not assign, resell, sub-license or otherwise transfer or
          delegate any of your rights or obligations hereunder, in whole or in
          part, without our prior written consent, which consent shall be at our
          own sole discretion and without obligation; any such assignment or
          transfer shall be null and void. We are free to assign any of its
          rights or obligations hereunder, in whole or in part, to any third
          party as part of the sale of all or substantially all of its assets or
          stock or as part of a merger.
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Changes and amendments
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          We reserve the right to modify this Agreement or its terms relating to
          the Website and Services at any time, effective upon posting of an
          updated version of this Agreement on the Website. When we do, we will
          post a notification on the main page of the Website. Continued use of
          the Website and Services after any such changes shall constitute your
          consent to such changes.
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Acceptance of these terms
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          You acknowledge that you have read this Agreement and agree to all its
          terms and conditions. By accessing and using the Website and Services
          you agree to be bound by this Agreement. If you do not agree to abide
          by the terms of this Agreement, you are not authorized to access or
          use the Website and Services.
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Refund policy
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          Our policy is valid for a period of 3 calendar days from the date of
          the purchase. If you are not satisfied with the service for any reason
          you can ask for a refund. A pro-rated refund will be issued for the
          unused portion of the services. If the period of 3 days has lapsed
          since the purchase, we can't, unfortunately, offer you a refund.
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Refund requirements
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          The following criteria must be met to qualify for a refund: 1 Service
          must not be used 2 Service malfunctions or doesn't work as described
          If the conditions listed above are not met, we reserve the right not
          to issue a refund. It's important to keep in mind that there is often
          a difference between a service that doesn't work and a situation where
          you are receiving an error message. Error messages could be related to
          an incorrect setup, configuration or software and as a result the
          service is not working.
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Additional services
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          Please note that any additional services, custom work or technical
          support are non-refundable as our time cannot be recovered.
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          DMCA policy
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          This Digital Millennium Copyright Act policy ("Policy") applies to the
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL("http://shareslate.com")}
          >
            {" "}
            shareslate.com{""}
          </Text>{" "}
          website ("Website" or "Service") and any of its related products and
          services (collectively, "Services") and outlines how Share Slate INC
          ("Share Slate INC", "we", "us" or "our") addresses copyright
          infringement notifications and how you ("you" or "your") may submit a
          copyright infringement complaint. Protection of intellectual property
          is of utmost importance to us and we ask our users and their
          authorized agents to do the same. It is our policy to expeditiously
          respond to clear notifications of alleged copyright infringement that
          comply with the United States Digital Millennium Copyright Act
          ("DMCA") of 1998, the text of which can be found at the U.S. Copyright
          Office
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL("https://www.copyright.gov")}
          >
            {" "}
            website{""}
          </Text>
          .
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          What to consider before submitting a copyright complaint
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          Before submitting a copyright complaint to us, consider whether the
          use could be considered fair use. Fair use states that brief excerpts
          of copyrighted material may, under certain circumstances, be quoted
          verbatim for purposes such as criticism, news reporting, teaching, and
          research, without the need for permission from or payment to the
          copyright holder. If you have considered fair use, and you still wish
          to continue with a copyright complaint, you may want to first reach
          out to the user in question to see if you can resolve the matter
          directly with the user.{"\n"}
          {"\n"}Please note that under 17 U.S.C. § 512(f), you may be liable for
          any damages, including costs and attorneys’ fees incurred by us or our
          users, if you knowingly misrepresent that the material or activity is
          infringing. If you are unsure whether the material you are reporting
          is in fact infringing, you may wish to contact an attorney before
          filing a notification with us. We may, at our discretion or as
          required by law, share a copy of your notification or
          counter-notification with third parties. This may include sharing the
          information with the account holder engaged in the allegedly
          infringing activity or for publication. If you are concerned about
          your information being forwarded, you may wish to{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() =>
              Linking.openURL(
                "https://www.copyrighted.com/professional-takedowns"
              )
            }
          >
            {" "}
            use an agent {""}
          </Text>
          to report infringing material for you.
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Notifications of infringement
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          If you are a copyright owner or an agent thereof, and you believe that
          any material available on our Services infringes your copyrights, then
          you may submit a written copyright infringement notification
          ("Notification") using the contact details below pursuant to the DMCA.
          All such Notifications must comply with the DMCA requirements. You may
          refer to a
          <Text
            style={{ color: "blue" }}
            onPress={() =>
              Linking.openURL(
                "https://www.websitepolicies.com/create/dmca-takedown-notice"
              )
            }
          >
            {" "}
            DMCA takedown notice generator {""}
          </Text>
          or other similar services to avoid making mistake and ensure
          compliance of your Notification.
          {"\n"}
          {"\n"}
          Filing a DMCA complaint is the start of a pre-defined legal process.
          Your complaint will be reviewed for accuracy, validity, and
          completeness. If your complaint has satisfied these requirements, our
          response may include the removal or restriction of access to allegedly
          infringing material as well as a permanent termination of repeat
          infringers’ accounts. A backup of the terminated account’s data may be
          requested, however it may be subject to certain penalty fees imposed.
          The final penalty fee will be determined by the severity and frequency
          of the violations.
          {"\n"}
          {"\n"}
          If we remove or restrict access to materials or terminate an account
          in response to a Notification of alleged infringement, we will make a
          good faith effort to contact the affected user with information
          concerning the removal or restriction of access, which may include a
          full copy of your Notification (including your name, address, phone,
          and email address).
          {"\n"}
          {"\n"}
          Notwithstanding anything to the contrary contained in any portion of
          this Policy, Share Slate INC reserves the right to take no action upon
          receipt of a DMCA copyright infringement notification if it fails to
          comply with all the requirements of the DMCA for such notifications.
          {"\n"}
          {"\n"}
          The process described in this Policy does not limit our ability to
          pursue any other remedies we may have to address suspected
          infringement.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={18}
        >
          Reporting copyright infringement
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          If you would like to notify us of the infringing material or activity,
          you may do so via the
          <Text
            style={{ color: "blue" }}
            onPress={() =>
              Linking.openURL("https://www.shareslate.com/contact")
            }
          >
            {" "}
            contact form
          </Text>{" "}
          or send an email to contact@shareslate.com
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Disclaimer
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          This disclaimer ("Disclaimer") sets forth the general guidelines,
          disclosures, and terms of your use of the{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL("http://shareslate.com")}
          >
            shareslate.com{" "}
          </Text>
          website ("Website" or "Service") and any of its related products and
          services (collectively, "Services"). This Disclaimer is a legally
          binding agreement between you ("User", "you" or "your") and Share
          Slate INC ("Share Slate INC", "we", "us" or "our"). By accessing and
          using the Website and Services, you acknowledge that you have read,
          understood, and agree to be bound by the terms of this Disclaimer. If
          you are entering into this Disclaimer on behalf of a business or other
          legal entity, you represent that you have the authority to bind such
          entity to this Disclaimer, in which case the terms "User", "you" or
          "your" shall refer to such entity. If you do not have such authority,
          or if you do not agree with the terms of this Disclaimer, you must not
          accept this Disclaimer and may not access and use the Website and
          Services. You acknowledge that this Disclaimer is a contract between
          you and Share Slate INC, even though it is electronic and is not
          physically signed by you, and it governs your use of the Website and
          Services.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Representation
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          Any views or opinions represented on the Website belong solely to the
          content creators and do not represent those of people, institutions or
          organizations that Share Slate INC or creators may or may not be
          associated with in professional or personal capacity, unless
          explicitly stated. Any views or opinions are not intended to malign
          any religion, ethnic group, club, organization, company, or
          individual.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Content and postings
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          You may print a copy of any part of the Website and Services for your
          own personal, non-commercial use, but you may not copy any part of the
          Website and Services for any other purposes, and you may not modify
          any part of the Website and Services. Inclusion of any part of the
          Website and Services in another work, whether in printed or electronic
          or another form or inclusion of any part of the Website and Services
          on another resource by embedding, framing or otherwise without the
          express permission of Share Slate INC is prohibited.{"\n"}
          {"\n"} You may submit new content and comment on the existing content
          on the Website. By uploading or otherwise making available any
          information to Share Slate INC, you grant Share Slate INC the
          unlimited, perpetual right to distribute, display, publish, reproduce,
          reuse and copy the information contained therein. You may not
          impersonate any other person through the Website and Services. You may
          not post content that is defamatory, fraudulent, obscene, threatening,
          invasive of another person's privacy rights or that is otherwise
          unlawful. You may not post content that infringes on the intellectual
          property rights of any other person or entity. You may not post any
          content that includes any computer virus or other code designed to
          disrupt, damage, or limit the functioning of any computer software or
          hardware.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Compensation and sponsorship
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          The Website and Services accepts forms of advertising, sponsorship,
          paid insertions or other forms of compensation. On certain occasions
          Share Slate INC may be compensated to provide opinion on products,
          services, websites and various other topics. The compensation received
          may influence the advertising content, topics or posts made on the
          Website. Sponsored content, advertising space or post will always be
          identified as such. Some of the links on the Website may be "affiliate
          links". This means if you click on the link and purchase an item,
          Share Slate INC will receive an affiliate commission.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Fitness and medical disclaimer
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          The information available on the Website is for general health
          information only and is not intended to be a substitute for
          professional medical advice, diagnosis or treatment. You should not
          rely exclusively on information provided on the Website for your
          health needs. All specific medical questions should be presented to
          your own health care provider and you should seek medical advice
          regarding your health and before starting any nutrition, weight loss
          or any other type of workout program.{"\n"}
          {"\n"}If you choose to use the information available on the Website
          without prior consultation with and consent of your physician, you are
          agreeing to accept full responsibility for your decisions and agreeing
          to hold harmless Share Slate INC, its agents, employees, contractors,
          and any affiliated companies from any liability with respect to injury
          or illness to you or your property arising out of or connected with
          your use of this information.{"\n"}
          {"\n"}There may be risks associated with participating in activities
          presented on the Website for people in good or poor health or with
          pre-existing physical or mental health conditions. If you choose to
          participate in these risks, you do so of your own free will and
          accord, knowingly and voluntarily assuming all risks associated with
          such activities.{"\n"}
          {"\n"}The results obtained from the information available on the
          Website may vary, and will be based on your individual background,
          physical health, previous experience, capacity, ability to act,
          motivation and other variables. There are no guarantees concerning the
          level of success you may experience.
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Not legal advice
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          The information provided on the Website is for general information
          purposes only and is not an alternative to legal advice from your
          lawyer, other professional services provider, or expert. It is not
          intended to provide legal advice or opinions of any kind. You should
          not act, or refrain from acting, based solely upon the information
          provided on the Website without first seeking appropriate legal or
          other professional advice. If you have any specific questions about
          any legal matter, you should consult your lawyer, other professional
          services provider, or expert. You should never delay seeking legal
          advice, disregard legal advice, or commence or discontinue any legal
          action because of the information on the Website.{"\n"}
          {"\n"}The information on the Website is provided for your convenience
          only. This information may have no evidentiary value and should be
          checked against official sources before it is used for any purposes.
          It is your responsibility to determine whether this information is
          admissible in a given judicial or administrative proceeding and
          whether there are any other evidentiary or filing requirements. Your
          use of this information is at your own risk.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Not financial advice
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          The information on the Website is provided for your convenience only
          and is not intended to be treated as financial, investment, tax, or
          other advice. Nothing contained on the Website constitutes a
          solicitation, recommendation, endorsement, or offer by Share Slate
          INC, its agents, employees, contractors, and any affiliated companies
          to buy or sell any securities or other financial instruments.{"\n"}
          {"\n"}All content on this site is the information of a general nature
          and does not address the circumstances of any particular individual or
          entity. Nothing on the Website constitutes professional and/or
          financial advice, nor does any information on the Website constitute a
          comprehensive or complete statement of the matters discussed or the
          law relating thereto. You alone assume the sole responsibility of
          evaluating the merits and risks associated with the use of any
          information or other content on the Website before making any
          decisions based on such information. You agree not to hold Share Slate
          INC, its agents, employees, contractors, and any affiliated companies
          liable for any possible claim for damages arising from any decision
          you make based on the information made available to you through the
          Website.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Not investment advice
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          All investments are highly speculative in nature and involve
          substantial risk of loss. We encourage everyone to invest very
          carefully. We also encourage investors to get personal advice from
          your professional investment advisor and to make independent
          investigations before acting on information found on the Website. We
          do not in any way whatsoever warrant or guarantee the success of any
          action you take in reliance on statements or information available on
          the Website.{"\n"}
          {"\n"}Past performance is not necessarily indicative of future
          results. All investments carry significant risk and all investment
          decisions of an individual remain the specific responsibility of that
          individual. There is no guarantee that systems, indicators, or signals
          will result in profits or that they will not result in full or partial
          losses. All investors are advised to fully understand all risks
          associated with any kind of investing they choose to do.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Reviews and testimonials
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          Testimonials are received in various forms through a variety of
          submission methods. They are individual experiences, reflecting
          experiences of those who have used the Services in some way or
          another. However, they are individual results and results do vary. We
          do not claim that they are typical results that consumers will
          generally achieve. The testimonials are not necessarily representative
          of all of those who will use the Services, and Share Slate INC is not
          responsible for the opinions or comments posted on the Website, and
          does not necessarily share them. All opinions expressed are strictly
          the views of the poster or reviewer.{"\n"}
          {"\n"} The testimonials displayed are given verbatim except for
          grammatical or typing error corrections. Some testimonials may have
          been edited for clarity, or shortened in cases where the original
          testimonial included extraneous information of no relevance to the
          general public. Testimonials may be reviewed for authenticity before
          they are posted for public viewing.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Indemnification and warranties
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          While we have made every attempt to ensure that the information
          contained on the Website is correct, Share Slate INC is not
          responsible for any errors or omissions, or for the results obtained
          from the use of this information. All information on the Website is
          provided "as is", with no guarantee of completeness, accuracy,
          timeliness or of the results obtained from the use of this
          information, and without warranty of any kind, express or implied. In
          no event will Share Slate INC, or its partners, employees or agents,
          be liable to you or anyone else for any decision made or action taken
          in reliance on the information on the Website, or for any
          consequential, special or similar damages, even if advised of the
          possibility of such damages.
          {"\n"}
          {"\n"}As with any business, your results may vary and will be based on
          your individual capacity, experience, expertise, and level of desire.
          There are no guarantees concerning the level of success you may
          experience. There is no guarantee that you will make any income at all
          and you accept the risk that the earnings and income statements differ
          by individual. Each individual’s success depends on his or her
          background, dedication, desire and motivation. The use of the
          information on the Website and Services should be based on your own
          due diligence and you agree that Share Slate INC is not liable for any
          success or failure of your business that is directly or indirectly
          related to the purchase and use of our information, products, and
          services reviewed or advertised on the Website. Furthermore,
          information contained on the Website and any pages linked to and from
          it are subject to change at any time and without warning.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Changes and amendments
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          We reserve the right to modify this Disclaimer or its terms relating
          to the Website and Services at any time, effective upon posting of an
          updated version of this Disclaimer on the Website. When we do, we will
          post a notification on the main page of the Website. Continued use of
          the Website and Services after any such changes shall constitute your
          consent to such changes.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Acceptance of this disclaimer
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          You acknowledge that you have read this Disclaimer and agree to all
          its terms and conditions. By accessing and using the Website and
          Services you agree to be bound by this Disclaimer. If you do not agree
          to abide by the terms of this Disclaimer, you are not authorized to
          access or use the Website and Services.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Cookie policy
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          This cookie policy ("Policy") describes what cookies are and how and
          they're being used by the{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL("http://shareslate.com")}
          >
            shareslate.com{" "}
          </Text>{" "}
          website ("Website" or "Service") and any of its related products and
          services (collectively, "Services"). This Policy is a legally binding
          agreement between you ("User", "you" or "your") and Share Slate INC
          ("Share Slate INC", "we", "us" or "our"). You should read this Policy
          so you can understand the types of cookies we use, the information we
          collect using cookies and how that information is used. It also
          describes the choices available to you regarding accepting or
          declining the use of cookies. For further information on how we use,
          store and keep your personal data secure, see our{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() =>
              Linking.openURL("https://www.shareslate.com/privacy")
            }
          >
            Privacy Policy{" "}
          </Text>
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          What are cookies?
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          Cookies are small pieces of data stored in text files that are saved
          on your computer or other devices when websites are loaded in a
          browser. They are widely used to remember you and your preferences,
          either for a single visit (through a "session cookie") or for multiple
          repeat visits (using a "persistent cookie").{"\n"}
          {"\n"}Session cookies are temporary cookies that are used during the
          course of your visit to the Website, and they expire when you close
          the web browser.{"\n"}
          {"\n"}Persistent cookies are used to remember your preferences within
          our Website and remain on your desktop or mobile device even after you
          close your browser or restart your computer. They ensure a consistent
          and efficient experience for you while visiting the Website and
          Services.{"\n"}
          {"\n"}
          Cookies may be set by the Website ("first-party cookies"), or by third
          parties, such as those who serve content or provide advertising or
          analytics services on the Website ("third party cookies"). These third
          parties can recognize you when you visit our website and also when you
          visit certain other websites.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          What type of cookies do we use? Necessary cookies
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          Necessary cookies allow us to offer you the best possible experience
          when accessing and navigating through our Website and using its
          features. For example, these cookies let us recognize that you have
          created an account and have logged into that account to access the
          content.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Functionality cookies
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          Functionality cookies let us operate the Website and Services in
          accordance with the choices you make. For example, we will recognize
          your username and remember how you customized the Website and Services
          during future visits.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Analytical cookies
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          These cookies enable us and third party services to collect aggregated
          data for statistical purposes on how our visitors use the Website.
          These cookies do not contain personal information such as names and
          email addresses and are used to help us improve your user experience
          of the Website.{" "}
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Advertising cookies
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          Advertising cookies allow us and third parties serve relevant ads to
          you more effectively and help us collect aggregated audit data,
          research, and performance reporting for advertisers. They also enable
          us to understand and improve the delivery of ads to you and know when
          certain ads have been shown to you.
          {"\n"}
          {"\n"}
          Your web browser may request advertisements directly from ad network
          servers, these networks can view, edit, or set their own cookies, just
          as if you had requested a web page from their website.
          {"\n"}
          {"\n"}
          Although we do not use cookies to create a profile of your browsing
          behavior on third party websites, we do use aggregate data from third
          parties to show you relevant, interest-based advertising.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Social media cookies
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          Third party cookies from social media sites (such as Facebook,
          Twitter, etc) let us track social network users when they visit or use
          the Website and Services, or share content, by using a tagging
          mechanism provided by those social networks.{"\n"}
          {"\n"}
          These cookies are also used for event tracking and remarketing
          purposes. Any data collected with these tags will be used in
          accordance with our and social networks’ privacy policies. We will not
          collect or share any personally identifiable information from the
          user.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Do we use web beacons or tracking pixels?
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          Our emails may contain a "web beacon" (or "tracking pixel") to tell us
          whether our emails are opened and verify any clicks through to links
          or advertisements within the email.
          {"\n"}
          {"\n"}
          We may use this information for purposes including determining which
          of our emails are more interesting to users and to query whether users
          who do not open our emails wish to continue receiving them.
          {"\n"}
          {"\n"}
          The pixel will be deleted when you delete the email. If you do not
          wish the pixel to be downloaded to your device, you should read the
          email in plain text view or with images disabled.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          What are your cookie options?
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          If you don't like the idea of cookies or certain types of cookies, you
          can change your browser's settings to delete cookies that have already
          been set and to not accept new cookies. To learn more about how to do
          this or to learn more about cookies, visit{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL("https://www.internetcookies.com/")}
          >
            internetcookies.org{" "}
          </Text>
          {"\n"}
          {"\n"}
          Please note, however, that if you delete cookies or do not accept
          them, you might not be able to use all of the features the Website and
          Services offer.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Acceptance of this policy
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          You acknowledge that you have read this Policy and agree to all its
          terms and conditions. By accessing and using the Website and Services
          you agree to be bound by this Policy. If you do not agree to abide by
          the terms of this Policy, you are not authorized to access or use the
          Website and Services.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Acceptable use policy
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          This acceptable use policy ("Policy") sets forth the general
          guidelines and acceptable and prohibited uses of the{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL("http://shareslate.com")}
          >
            shareslate.com{" "}
          </Text>
          website ("Website" or "Service") and any of its related products and
          services (collectively, "Services"). This Policy is a legally binding
          agreement between you ("User", "you" or "your") and Share Slate INC
          ("Share Slate INC", "we", "us" or "our"). By accessing and using the
          Website and Services, you acknowledge that you have read, understood,
          and agree to be bound by the terms of this Agreement. If you are
          entering into this Agreement on behalf of a business or other legal
          entity, you represent that you have the authority to bind such entity
          to this Agreement, in which case the terms "User", "you" or "your"
          shall refer to such entity. If you do not have such authority, or if
          you do not agree with the terms of this Agreement, you must not accept
          this Agreement and may not access and use the Website and Services.
          You acknowledge that this Agreement is a contract between you and
          Share Slate INC, even though it is electronic and is not physically
          signed by you, and it governs your use of the Website and Services.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Prohibited activities and uses
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          You may not use the Website and Services to publish content or engage
          in activity that is illegal under applicable law, that is harmful to
          others, or that would subject us to liability, including, without
          limitation, in connection with any of the following, each of which is
          prohibited under this Policy:{"\n"}
          {"\n"}Distributing malware or other malicious code. Disclosing
          sensitive personal information about others. Collecting, or attempting
          to collect, personal information about third parties without their
          knowledge or consent. Distributing pornography or adult related
          content. Promoting or facilitating prostitution or any escort
          services. Hosting, distributing or linking to child pornography or
          content that is harmful to minors. Promoting or facilitating gambling,
          violence, terrorist activities or selling weapons or ammunition.
          Engaging in the unlawful distribution of controlled substances, drug
          contraband or prescription medications. Managing payment aggregators
          or facilitators such as processing payments on behalf of other
          businesses or charities. Facilitating pyramid schemes or other models
          intended to seek payments from public actors. Threatening harm to
          persons or property or otherwise harassing behavior. Manual or
          automatic credit card or other available payment methods testing using
          bots or scripts. Purchasing any of the offered Services on someone
          else’s behalf. Misrepresenting or fraudulently representing products
          or services. Infringing the intellectual property or other proprietary
          rights of others. Facilitating, aiding, or encouraging any of the
          above activities through the Website and Services.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          System abuse
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          Any User in violation of the Website and Services security is subject
          to criminal and civil liability, as well as immediate account
          termination. Examples include, but are not limited to the following:
          {"\n"}
          {"\n"}Distributing malware or other malicious code. Use or
          distribution of tools designed for compromising security of the
          Website and Services. Intentionally or negligently transmitting files
          containing a computer virus or corrupted data. Accessing another
          network without permission, including to probe or scan for
          vulnerabilities or breach security or authentication measures.
          Unauthorized scanning or monitoring of data on any network or system
          without proper authorization of the owner of the system or network{" "}
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Service resources
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          You may not consume excessive amounts of the resources of the Website
          and Services or use the Website and Services in any way which results
          in performance issues or which interrupts the Services for other
          Users. Prohibited activities that contribute to excessive use, include
          without limitation: Deliberate attempts to overload the Website and
          Services and broadcast attacks (i.e. denial of service attacks).
          Engaging in any other activities that degrade the usability and
          performance of the Website and Services. Hosting or running malicious
          code or other scripts or processes that adversely impact the Website
          and Services. Operating a file sharing site or scripts for BitTorrent
          or similar, which includes sending or receiving files containing these
          mechanisms. Web proxy scripts, such as those that allow anyone to
          browse to a third party website anonymously, are prohibited.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          No spam policy
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          You may not use the Website and Services to send spam or bulk
          unsolicited messages. We maintain a zero tolerance policy for use of
          the Website and Services in any manner associated with the
          transmission, distribution or delivery of any bulk e-mail, including
          unsolicited bulk or unsolicited commercial e-mail, or the sending,
          assisting, or commissioning the transmission of commercial e-mail that
          does not comply with the U.S. CAN-SPAM Act of 2003 ("SPAM"). Your
          products or services advertised via SPAM (i.e. Spamvertised) may not
          be used in conjunction with the Website and Services. This provision
          includes, but is not limited to, SPAM sent via fax, phone, postal
          mail, email, instant messaging, or newsgroups. Sending emails through
          the Website and Services to purchased email lists ("safe lists") will
          be treated as SPAM.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Defamation and objectionable content
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          We value the freedom of expression and encourage Users to be
          respectful with the content they post. We are not a publisher of User
          content and are not in a position to investigate the veracity of
          individual defamation claims or to determine whether certain material,
          which we may find objectionable, should be censored. However, we
          reserve the right to moderate, disable or remove any content to
          prevent harm to others or to us or the Website and Services, as
          determined in our sole discretion.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Copyrighted content
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          Copyrighted material must not be published via the Website and
          Services without the explicit permission of the copyright owner or a
          person explicitly authorized to give such permission by the copyright
          owner. Upon receipt of a claim for copyright infringement, or a notice
          of such violation, we will immediately run full investigation and,
          upon confirmation, will notify the person or persons responsible for
          publishing it and, in our sole discretion, will remove the infringing
          material from the Website and Services. We may terminate the Service
          of Users with repeated copyright infringements. Further procedures may
          be carried out if necessary. We will assume no liability to any User
          of the Website and Services for the removal of any such material. If
          you believe your copyright is being infringed by a person or persons
          using the Website and Services, please get in touch with us to report
          copyright infringement.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Security
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          You take full responsibility for maintaining reasonable security
          precautions for your account. You are responsible for protecting and
          updating any login account provided to you for the Website and
          Services. You are responsible for ensuring all User provided software
          installed by you on the Website and Services is updated and patched
          following industry best practice.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
Terms & Conditions
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          To get more information please click on{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() =>
              Linking.openURL("https://www.shareslate.com/terms")
            }
          >
             Terms & Conditions.{" "}
          </Text>
          .
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Enforcement
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          We reserve our right to be the sole arbiter in determining the
          seriousness of each infringement and to immediately take corrective
          actions, including but not limited to:
          {"\n"}
          {"\n"}Suspending or terminating your Service with or without notice
          upon any violation of this Policy. Any violations may also result in
          the immediate suspension or termination of your account. Disabling or
          removing any content which is prohibited by this Policy, including to
          prevent harm to others or to us or the Website and Services, as
          determined by us in our sole discretion. Reporting violations to law
          enforcement as determined by us in our sole discretion. A failure to
          respond to an email from our abuse team within 2 days, or as otherwise
          specified in the communication to you, may result in the suspension or
          termination of your account.
          {"\n"}
          {"\n"}Suspended and terminated User accounts due to violations will
          not be re-activated. A backup of User’s data may be requested, however
          it may be subject to certain penalty fees imposed according to the
          breach of this Policy terms. The final penalty fee will be determined
          by the type and frequency of the violations.
          {"\n"}
          {"\n"}Nothing contained in this Policy shall be construed to limit our
          actions or remedies in any way with respect to any of the prohibited
          activities. We reserve the right to take any and all additional
          actions we may deem appropriate with respect to such activities,
          including without limitation taking action to recover the costs and
          expenses of identifying offenders and removing them from the Website
          and Services, and levying cancellation charges to cover our costs. In
          addition, we reserve at all times all rights and remedies available to
          us with respect to such activities at law or in equity.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Reporting violations
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          If you have discovered and would like to report a violation of this
          Policy, please contact us immediately. We will investigate the
          situation and provide you with full assistance.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Changes and amendments
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          We reserve the right to modify this Policy or its terms relating to
          the Website and Services at any time, effective upon posting of an
          updated version of this Policy on the Website. When we do, we will
          post a notification on the main page of the Website. Continued use of
          the Website and Services after any such changes shall constitute your
          consent to such changes.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Acceptance of this policy
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          You acknowledge that you have read this Policy and agree to all its
          terms and conditions. By accessing and using the Website and Services
          you agree to be bound by this Policy. If you do not agree to abide by
          the terms of this Policy, you are not authorized to access or use the
          Website and Services.
        </Text>

        <Text
          style={{
            fontFamily: "open-sans-bold",
            marginTop: 20,
          }}
          color={argonTheme.COLORS.TEXT}
          size={20}
        >
          Contacting us
        </Text>
        <Text
          style={{
            fontFamily: "open-sans-regular",
            marginTop: 10,
          lineHeight: 25,textAlign:"justify"
          
          }}
          color={argonTheme.COLORS.TEXT}
          size={12}
        >
          If you would like to contact us to understand more about this
          Agreement or wish to contact us concerning any matter relating to it,
          you may do so via the{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() =>
              Linking.openURL("https://www.shareslate.com/contact")
            }
          >
            {" "}
            contact form
          </Text>{" "}
          or send an email to contact@shareslate.com or send an email to
          contact@shareslate.com
          {"\n"}
          {"\n"}
          This document was last updated on December 22, 2020
          {"\n"}
          {"\n"}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 15,
    // paddingVertical: 10,
  },
  scrollView: { paddingHorizontal: 5 },
  maindot: { width: 10, height: 11 },
  dot: { backgroundColor: "#59ADFF", width: 8, height: 8, borderRadius: 10 },
});
