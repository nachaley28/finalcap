import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const formatSegmentName = (segment) => {
  if (!segment && segment !== 0) return '';
  if (!isNaN(parseFloat(segment)) && isFinite(segment)) {
    return String(segment);
  }
  return segment
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const Breadcrumber = ({
  basePath = "/",
  basePathName = "Home",
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const pathTranslations = {
    "account-management": "Account Management"
  };

  const normalizedBaseRoute = basePath === '/' ? '/' : basePath.replace(/\/$/, '');

  const breadcrumbItemsJsx = [];
  let pathSegments = [];

  if (currentPath.startsWith(normalizedBaseRoute)) {
    let pathAfterBase = currentPath.substring(normalizedBaseRoute.length);

    if (pathAfterBase.length > 0 && pathAfterBase[0] !== '/') {
      pathAfterBase = `/${pathAfterBase}`;
    } else if (pathAfterBase === '') {
      pathAfterBase = '/';
    }
    pathSegments = pathAfterBase.split('/').filter(segment => segment);
  }

  const isBaseRouteTheCurrentPage = currentPath === normalizedBaseRoute;

  breadcrumbItemsJsx.push(
    <Breadcrumb.Item
      key={`breadcrumb-${normalizedBaseRoute}`}
      linkAs={isBaseRouteTheCurrentPage ? undefined : Link}
      linkProps={isBaseRouteTheCurrentPage ? {} : { to: normalizedBaseRoute }}
      active={isBaseRouteTheCurrentPage}
    >
      {basePathName}
    </Breadcrumb.Item>
  );

  let builtPathRelativeFromBase = normalizedBaseRoute === '/' ? '' : normalizedBaseRoute;

  pathSegments.forEach((segment, index) => {
    builtPathRelativeFromBase += `/${segment}`;
    const isLastSegment = index === pathSegments.length - 1;
    const displayName = pathTranslations[segment.toLowerCase()] || formatSegmentName(segment);

    const currentActiveSegment = isLastSegment && !isBaseRouteTheCurrentPage;

    breadcrumbItemsJsx.push(
      <Breadcrumb.Item
        key={`breadcrumb-${builtPathRelativeFromBase}`}
        linkAs={currentActiveSegment ? undefined : Link}
        linkProps={currentActiveSegment ? {} : { to: builtPathRelativeFromBase }}
        active={currentActiveSegment}
      >
        {displayName}
      </Breadcrumb.Item>
    );
  });

  const breadcrumb_items = [];
  const totalItems = breadcrumbItemsJsx.length;

  if (totalItems > 0) {
    breadcrumbItemsJsx.forEach((item, index) => {
      const lastIndex = index === totalItems - 1;
      const relevantPath = currentPath.startsWith(normalizedBaseRoute);

      if (relevantPath) {
        breadcrumb_items.push(
          React.cloneElement(item, {
            active: lastIndex,
            linkAs: lastIndex ? undefined : Link,
          })
        );
      } else if (index === 0) {
        breadcrumb_items.push(
          React.cloneElement(item, {
            active: false,
            linkAs: Link,
            linkProps: { to: normalizedBaseRoute }
          })
        );
      }
    });
  }


  if (breadcrumb_items.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      {breadcrumb_items}
    </Breadcrumb>
  );
};

export default Breadcrumber;